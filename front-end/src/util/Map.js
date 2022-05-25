import { useStemFluid } from '../pages/Workspace/components/StemFluid/StemFluid';

import { AIR_SOURCE_CODE, FAN_CODE, NONE_CODE, WENT_CODE } from './ObjectCodes';

export class ICFDMAP {
  constructor({ objects, resolution, viscosity, diffuse }) {
    this.resolution = resolution;
    this.viscosity = viscosity;
    this.diffuse = diffuse;

    if (!objects) {
      this.generateClearMap();
    } else {
      this.objects = objects;
    }
  }

  objectsToStemBound() {
    return this.objects.map(
      (cell) =>
        cell !== 0 &&
        cell !== WENT_CODE &&
        cell !== AIR_SOURCE_CODE &&
        cell !== FAN_CODE,
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
  }

  addObject(code, x, y) {
    this.objects[this.IX(x, y)] = code;
    this.updateStemBoundRef();
  }

  removeObject(x, y) {
    this.objects[this.IX(x, y)] = NONE_CODE;
    this.updateStemBoundRef();
  }

  updateStemBoundRef() {
    if (this.stemFluid) {
      this.stemFluid.updateBoundObjects(this.objectsToStemBound());
    }
  }

  generateClearMap() {
    this.objects = new Array(this.resolution * this.resolution).fill(0);
    this.updateStemBoundRef();
  }

  IX(i, j) {
    return i + (this.resolution + 2) * j;
  }
}
