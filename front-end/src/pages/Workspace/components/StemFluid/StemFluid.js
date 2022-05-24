/* eslint-disable no-param-reassign,class-methods-use-this */
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
    this.clear();
    this.boundObjects = boundObjects;
  }

  updateBoundObjects(boundObjects) {
    this.boundObjects = boundObjects;
  }

  clear() {
    const { N } = this;
    this.u = new Float32Array((N + 2) * (N + 2));
    this.u0 = new Float32Array((N + 2) * (N + 2));
    this.v = new Float32Array((N + 2) * (N + 2));
    this.v0 = new Float32Array((N + 2) * (N + 2));
    this.x = new Float32Array((N + 2) * (N + 2));
    this.x0 = new Float32Array((N + 2) * (N + 2));
  }

  step(dt) {
    this.velStep(this.N, this.u, this.v, this.u0, this.v0, this.visc, dt);
    this.densStep(this.N, this.x, this.x0, this.u, this.v, this.diff, dt);
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

  velStep(N, u, v, u0, v0, visc, dt) {
    this.addSource(N, u, u0, dt);
    this.addSource(N, v, v0, dt);
    this.diffuse(N, 1, u0, u, visc, dt);
    this.diffuse(N, 2, v0, v, visc, dt);
    this.project(N, u0, v0, u, v);
    this.advect(N, 1, u, u0, u0, v0, dt);
    this.advect(N, 2, v, v0, u0, v0, dt);
    this.project(N, u, v, u0, v0);
  }

  densStep(N, x, x0, u, v, diff, dt) {
    this.addSource(N, x, x0, dt);
    this.diffuse(N, 0, x0, x, diff, dt);
    this.advect(N, 0, x, x0, u, v, dt);
  }

  project(N, u, v, p, div) {
    for (let i = 1; i <= N; i += 1) {
      for (let j = 1; j <= N; j += 1) {
        // eslint-disable-next-line no-param-reassign
        div[IX(N, i, j)] =
          (-0.5 *
            (u[IX(N, i + 1, j)] -
              u[IX(N, i - 1, j)] +
              v[IX(N, i, j + 1)] -
              v[IX(N, i, j - 1)])) /
          N;
        // eslint-disable-next-line no-param-reassign
        p[IX(N, i, j)] = 0;
      }
    }
    this.setBnd(N, 0, div);
    this.setBnd(N, 0, p);

    this.linSolve(N, 0, p, div, 1, 4);

    for (let i = 1; i <= N; i += 1) {
      for (let j = 1; j <= N; j += 1) {
        // eslint-disable-next-line no-param-reassign
        u[IX(N, i, j)] -= 0.5 * N * (p[IX(N, i + 1, j)] - p[IX(N, i - 1, j)]);
        // eslint-disable-next-line no-param-reassign
        v[IX(N, i, j)] -= 0.5 * N * (p[IX(N, i, j + 1)] - p[IX(N, i, j - 1)]);
      }
    }
    this.setBnd(N, 1, u);
    this.setBnd(N, 2, v);
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
    for (let i = 1; i <= N; i += 1) {
      for (let j = 1; j <= N; j += 1) {
        x = i - dt0 * u[IX(N, i, j)];
        y = j - dt0 * v[IX(N, i, j)];
        if (x < 0.5) x = 0.5;
        if (x > N + 0.5) x = N + 0.5;
        // eslint-disable-next-line no-bitwise
        i0 = x | 0;
        i1 = i0 + 1;
        if (y < 0.5) y = 0.5;
        if (y > N + 0.5) y = N + 0.5;
        // eslint-disable-next-line no-bitwise
        j0 = y | 0;
        j1 = j0 + 1;
        s1 = x - i0;
        s0 = 1 - s1;
        t1 = y - j0;
        t0 = 1 - t1;
        // eslint-disable-next-line no-param-reassign
        d[IX(N, i, j)] =
          s0 * (t0 * d0[IX(N, i0, j0)] + t1 * d0[IX(N, i0, j1)]) +
          s1 * (t0 * d0[IX(N, i1, j0)] + t1 * d0[IX(N, i1, j1)]);
      }
    }

    this.setBnd(N, b, d);
  }

  diffuse(N, b, x, x0, diff, dt) {
    const a = dt * diff * N * N;
    this.linSolve(N, b, x, x0, a, 1 + 4 * a);
  }

  linSolve(N, b, x, x0, a, c) {
    for (let k = 0; k < 30; k += 1) {
      for (let i = 1; i <= N; i += 1) {
        for (let j = 1; j <= N; j += 1) {
          // eslint-disable-next-line no-param-reassign
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
      this.setBnd(N, b, x);
    }
  }

  addSource(N, x, s, dt) {
    const size = N * N;
    // eslint-disable-next-line no-param-reassign
    for (let i = 0; i < size; i += 1) x[i] += dt * s[i];
  }

  /*
                  Function of dealing with situation with boundary cells.
                  - b : int
                  - x : float[]
              */

  setBnd(N, b, x) {
    for (let i = 1; i <= N; i += 1) {
      for (let j = 1; j <= N; j += 1) {
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

    this.boundaryBoxReflect(N, b, x);
    this.boundaryBoxCorners(N, b, x);
  }

  boundaryBoxAbsorb(N, b, x) {
    for (let i = 1; i <= N; i += 1) {
      x[IX(N, 0, i)] = x[IX(N, 1, i)];
      x[IX(N, N + 1, i)] = x[IX(N, N, i)];
      x[IX(N, i, 0)] = x[IX(N, i, 1)];
      x[IX(N, i, N + 1)] = x[IX(N, i, N)];
    }
  }

  boundaryBoxReflect(N, b, x) {
    for (let i = 1; i <= N; i += 1) {
      x[IX(N, 0, i)] = b === 1 ? -x[IX(N, 1, i)] : x[IX(N, 1, i)];
      x[IX(N, N + 1, i)] = b === 1 ? -x[IX(N, N, i)] : x[IX(N, N, i)];
      x[IX(N, i, 0)] = b === 2 ? -x[IX(N, i, 1)] : x[IX(N, i, 1)];
      x[IX(N, i, N + 1)] = b === 2 ? -x[IX(N, i, N)] : x[IX(N, i, N)];
    }
  }

  boundaryBoxCorners(N, b, x) {
    x[IX(N, 0, 0)] = 0.5 * (x[IX(N, 1, 0)] + x[IX(N, 0, 1)]);
    x[IX(N, 0, N + 1)] = 0.5 * (x[IX(N, 1, N + 1)] + x[IX(N, 0, N)]);
    x[IX(N, N + 1, 0)] = 0.5 * (x[IX(N, N, 0)] + x[IX(N, N + 1, 1)]);
    x[IX(N, N + 1, N + 1)] = 0.5 * (x[IX(N, N, N + 1)] + x[IX(N, N + 1, N)]);
  }
}

const useStemFluid = ({ resolution, viscosity, diffuse, stemBound }) => {
  const stemBoundRef = useRef(stemBound);

  const [fluid, setFluid] = useState(
    new Fluid(resolution, viscosity, diffuse, stemBound),
  );

  const updateBoundObjects = (newBound) => {
    stemBoundRef.current = newBound;
    fluid.updateBoundObjects(newBound);
  };

  const clearDensity = () => {
    setFluid(new Fluid(resolution, viscosity, diffuse, stemBoundRef.current));
  };

  return {
    fluid,
    stemBoundRef,
    clearDensity,
    resolution,
    updateBoundObjects,
  };
};

export { IX, useStemFluid };
