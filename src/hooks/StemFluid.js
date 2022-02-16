import { useRef, useState } from 'react';

function IX(N, i, j) {
  return i + (N + 2) * j;
}

/*
    Function of solving linear differential equation
    - b : int
    - x : float[]
    - x0 : float[]
    - a : float
    - c : float
*/

/*
    Function of diffuse
    - b : int
    - x : float[]
    - x0 : float[]
    - diff : float
    - dt : flaot
*/
/*
    Function of advect: responsible for actually moving things around
    - b : int
    - d : float[]
    - d0 : float[]
    - velocX : float[]
    - velocY : float[]
    - velocZ : float[]
    - dt : float[]
*/

/*
    Function of project : This operation runs through all the cells and fixes them up so everything is in equilibrium.
    - velocX : float[]
    - velocY : float[]
    = p : float[]
    - div : float[]
*/

class Fluid {
  constructor(N, visc, diff, boundObjects) {
    this.N = N;
    this.visc = visc || 0;
    this.diff = diff || 0;
    this.u = new Float32Array((N + 2) * (N + 2));
    this.u0 = new Float32Array((N + 2) * (N + 2));
    this.v = new Float32Array((N + 2) * (N + 2));
    this.v0 = new Float32Array((N + 2) * (N + 2));
    this.x = new Float32Array((N + 2) * (N + 2));
    this.x0 = new Float32Array((N + 2) * (N + 2));
    this.boundObjects = boundObjects;
  }

  updateBoundObjects(boundObjects) {
    this.boundObjects = boundObjects;
  }

  clear() {
    console.warn('Cleared fluid simulation.');
    const { N } = this;
    this.u = new Float32Array((N + 2) * (N + 2));
    this.u0 = new Float32Array((N + 2) * (N + 2));
    this.v = new Float32Array((N + 2) * (N + 2));
    this.v0 = new Float32Array((N + 2) * (N + 2));
    this.x = new Float32Array((N + 2) * (N + 2));
    this.x0 = new Float32Array((N + 2) * (N + 2));
  }

  step(dt) {
    this.vel_step(this.N, this.u, this.v, this.u0, this.v0, this.visc, dt);
    this.dens_step(this.N, this.x, this.x0, this.u, this.v, this.diff, dt);
    this.u0.fill(0);
    this.v0.fill(0);
    this.x0.fill(0);
  }

  addDensity(x, y, dd) {
    this.x0[IX(this.N, x, y)] += dd;
  }

  addForce(x, y, fx, fy) {
    this.u0[IX(this.N, x, y)] += fx;
    this.v0[IX(this.N, x, y)] += fy;
  }

  densityAt(x, y) {
    return this.x[IX(this.N, x, y)];
  }

  velocityAt(x, y) {
    const ix = IX(this.N, x, y);
    return [this.u[ix], this.v[ix]];
  }

  vel_step(N, u, v, u0, v0, visc, dt) {
    this.add_source(N, u, u0, dt);
    this.add_source(N, v, v0, dt);
    this.diffuse(N, 1, u0, u, visc, dt);
    this.diffuse(N, 2, v0, v, visc, dt);
    this.project(N, u0, v0, u, v);
    this.advect(N, 1, u, u0, u0, v0, dt);
    this.advect(N, 2, v, v0, u0, v0, dt);
    this.project(N, u, v, u0, v0);
  }

  dens_step(N, x, x0, u, v, diff, dt) {
    this.add_source(N, x, x0, dt);
    this.diffuse(N, 0, x0, x, diff, dt);
    this.advect(N, 0, x, x0, u, v, dt);
  }

  project(N, u, v, p, div) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        div[IX(N, i, j)] =
          (-0.5 *
            (u[IX(N, i + 1, j)] -
              u[IX(N, i - 1, j)] +
              v[IX(N, i, j + 1)] -
              v[IX(N, i, j - 1)])) /
          N;
        p[IX(N, i, j)] = 0;
      }
    }
    this.set_bnd(N, 0, div);
    this.set_bnd(N, 0, p);

    this.lin_solve(N, 0, p, div, 1, 4);

    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        u[IX(N, i, j)] -= 0.5 * N * (p[IX(N, i + 1, j)] - p[IX(N, i - 1, j)]);
        v[IX(N, i, j)] -= 0.5 * N * (p[IX(N, i, j + 1)] - p[IX(N, i, j - 1)]);
      }
    }
    this.set_bnd(N, 1, u);
    this.set_bnd(N, 2, v);
  }

  advect(N, b, d, d0, u, v, dt) {
    let i0;
    let j0;
    let i1;
    let j1;
    let x;
    let y;
    let s0;
    let t0;
    let s1;
    let t1;

    const dt0 = dt * N;
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        x = i - dt0 * u[IX(N, i, j)];
        y = j - dt0 * v[IX(N, i, j)];
        if (x < 0.5) x = 0.5;
        if (x > N + 0.5) x = N + 0.5;
        i0 = x | 0;
        i1 = i0 + 1;
        if (y < 0.5) y = 0.5;
        if (y > N + 0.5) y = N + 0.5;
        j0 = y | 0;
        j1 = j0 + 1;
        s1 = x - i0;
        s0 = 1 - s1;
        t1 = y - j0;
        t0 = 1 - t1;
        d[IX(N, i, j)] =
          s0 * (t0 * d0[IX(N, i0, j0)] + t1 * d0[IX(N, i0, j1)]) +
          s1 * (t0 * d0[IX(N, i1, j0)] + t1 * d0[IX(N, i1, j1)]);
      }
    }

    this.set_bnd(N, b, d);
  }

  diffuse(N, b, x, x0, diff, dt) {
    const a = dt * diff * N * N;
    this.lin_solve(N, b, x, x0, a, 1 + 4 * a);
  }

  lin_solve(N, b, x, x0, a, c) {
    for (let k = 0; k < 30; k++) {
      for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
          x[IX(N, i, j)] =
            (x0[IX(N, i, j)] +
              a *
                (x[IX(N, i - 1, j)] +
                  x[IX(N, i + 1, j)] +
                  x[IX(N, i, j - 1)] +
                  x[IX(N, i, j + 1)])) /
            c;
        }
      }
      this.set_bnd(N, b, x);
    }
  }

  add_source(N, x, s, dt) {
    const size = N * N;
    for (let i = 0; i < size; i++) x[i] += dt * s[i];
  }

  /*
          Function of dealing with situation with boundary cells.
          - b : int
          - x : float[]
      */

  set_bnd(N, b, x) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        if (this.boundObjects[IX(N, i, j)]) {
          // x[IX(N,i,j)] = (((x[IX(N,i - 1, j)] + x[IX(N,i + 1,j)] + x[IX(N,i, j - 1)] + x[IX(N,i,j + 1)])) / 4);
          x[IX(N, i, j)] = x[IX(N, i - 1, j)];
          x[IX(N, i, j)] -= x[IX(N, i, j - 1)];
          x[IX(N, i, j)] += x[IX(N, i + 1, j)];
          x[IX(N, i, j)] -= x[IX(N, i + 1, j + 1)];

          x[IX(N, i, j)] *= 0;
        }
      }
    }

    this.boundary_box_reflect(N, b, x);
    this.boundary_box_corners(N, b, x);
  }

  boundary_box_absorb(N, b, x) {
    for (let i = 1; i <= N; i++) {
      x[IX(N, 0, i)] = x[IX(N, 1, i)];
      x[IX(N, N + 1, i)] = x[IX(N, N, i)];
      x[IX(N, i, 0)] = x[IX(N, i, 1)];
      x[IX(N, i, N + 1)] = x[IX(N, i, N)];
    }
  }

  boundary_box_reflect(N, b, x) {
    for (let i = 1; i <= N; i++) {
      x[IX(N, 0, i)] = b === 1 ? -x[IX(N, 1, i)] : x[IX(N, 1, i)];
      x[IX(N, N + 1, i)] = b === 1 ? -x[IX(N, N, i)] : x[IX(N, N, i)];
      x[IX(N, i, 0)] = b === 2 ? -x[IX(N, i, 1)] : x[IX(N, i, 1)];
      x[IX(N, i, N + 1)] = b === 2 ? -x[IX(N, i, N)] : x[IX(N, i, N)];
    }
  }

  boundary_box_corners(N, b, x) {
    x[IX(N, 0, 0)] = 0.5 * (x[IX(N, 1, 0)] + x[IX(N, 0, 1)]);
    x[IX(N, 0, N + 1)] = 0.5 * (x[IX(N, 1, N + 1)] + x[IX(N, 0, N)]);
    x[IX(N, N + 1, 0)] = 0.5 * (x[IX(N, N, 0)] + x[IX(N, N + 1, 1)]);
    x[IX(N, N + 1, N + 1)] = 0.5 * (x[IX(N, N, N + 1)] + x[IX(N, N + 1, N)]);
  }
}

const useStemFluid = ({ SIMULATION_RESOLUTION, visc, diff, BOUND_OBJECTS }) => {
  const boundObjects = useRef(BOUND_OBJECTS);

  const [fluid, setFluid] = useState(
    new Fluid(SIMULATION_RESOLUTION, visc, diff, boundObjects.current),
  );

  const addSolidObject = (x, y) => {
    boundObjects.current[IX(SIMULATION_RESOLUTION, x, y)] = true;
    fluid.updateBoundObjects(boundObjects.current);
  };

  const removeSolidObject = (x, y) => {
    boundObjects.current[IX(SIMULATION_RESOLUTION, x, y)] = false;
    fluid.updateBoundObjects(boundObjects.current);
  };

  return { FLUID: fluid, addSolidObject, removeSolidObject, BOUND_OBJECTS };
};

export { IX, useStemFluid };
