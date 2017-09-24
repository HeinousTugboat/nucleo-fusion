// import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PrestigeService {
  public stepQ = 1e5;
  public sigMagic = 5.747734128;
  public earnableVoid = 0;

  constructor() { }

  private calcStepFactor(p: number): number {
    return Math.max(Math.pow(10, Math.log10(p)), 1);
  }
  private calcStep(p: number): number {
    return this.calcStepFactor(p) / this.stepQ;
  }
  private calcSigmoidQ(p: number): number {
    return 1 + (Math.exp(-p / (this.calcStepFactor(p) - this.sigMagic)));
  }
  private calcSigmoid(p: number): number {
    return 1 / this.calcSigmoidQ(p) + 0.1;
  }
  public calcExotic(p: number): number {
    return Math.floor(this.calcSigmoid(p) * this.calcStep(p));
  }
  public calcVoid(ex: number): number {
    return Math.max(0, Math.floor(Math.log10(ex)) - 9);
  }
  public calcExoticProd(ex: number): number {
    return (ex * 1000) / (ex + 1.5e9);
  }
}
