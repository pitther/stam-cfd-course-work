import { useStemFluid } from '../pages/Workspace/components/StemFluid/StemFluid';

import { AIR_SOURCE_CODE, FAN_CODE, NONE_CODE, WENT_CODE } from './ObjectCodes';

export class ICFDMAP {
  constructor({ objects, resolution, viscosity, diffuse, id, name }) {
    this.resolution = resolution;
    this.viscosity = viscosity;
    this.diffuse = diffuse;
    this.id = id;
    this.name = name;

    if (!objects) {
      this.generateClearMap();
    } else {
      this.objects = objects;
      this.updateStemBoundRef();
    }
  }

  objectsToStemBound() {
    return this.objects.map(
      ({ code }) =>
        code !== 0 &&
        code !== WENT_CODE &&
        code !== AIR_SOURCE_CODE &&
        code !== FAN_CODE,
    );
  }

  initStemFluid() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    this.stemFluid = useStemFluid({
      resolution: this.resolution,
      stemBound: this.objectsToStemBound(),
      viscosity: this.viscosity,
      diffuse: this.diffuse,
    });
    this.updateStemBoundRef();
  }

  addObject(code, x, y, orientation) {
    this.objects[this.IX(x, y)].code = code;
    if (orientation) this.objects[this.IX(x, y)].orientation = orientation;
    this.updateStemBoundRef();
  }

  removeObject(x, y) {
    this.objects[this.IX(x, y)].code = NONE_CODE;
    this.updateStemBoundRef();
  }

  updateStemBoundRef() {
    if (this.stemFluid) {
      this.stemFluid.updateBoundObjects(this.objectsToStemBound());
    }
  }

  generateClearMap() {
    this.objects = new Array(
      (this.resolution + 2) * (this.resolution + 2),
    ).fill(0);
    this.objects = this.objects.map(() => ({ code: 0 }));
    this.updateStemBoundRef();
  }

  IX(i, j) {
    return i + (this.resolution + 2) * j;
  }
}
