import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Scheduler } from 'rxjs/Scheduler';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { DataService } from './data.service';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/timeInterval';

@Injectable()
export class UpdateService {
  public tick = 0;
  private running = true;
  // public loop$: IntervalObservable = new IntervalObservable(0, animationFrame);
  public loop$ = Observable
    .interval(0, animationFrame)
    .takeWhile(() => this.running)
    .timeInterval();
  public start: number = performance.now();
  public time: number = this.start;
  public lastSaved = 0;
  public autobuy = true;

  constructor(private dataService: DataService) {
    this.loop$.takeWhile(() => this.running).timeInterval();
    this.loop$.subscribe(({ value, interval }) => {
      this.dataService.update({ interval });
      // console.log(value);
      this.tick = value;
      this.time = performance.now();
      if (this.tick % 1000 === 0) {
        console.log('tick! (' + interval + 'ms) ' + this.tick);

      }
      if (this.autobuy) {
        const best = this.dataService.findBest();
        const cost = best.getCost();
        if (cost <= this.dataService.current) {
          this.dataService.current -= best.purchase();
        }
      }
      if (this.time - this.lastSaved > 1000) {
        this.dataService.save();
        this.lastSaved = this.time;
      }
      // if (this.tick >= 5000) {
      //     this.running = false;
      // }
    });
  }
}

