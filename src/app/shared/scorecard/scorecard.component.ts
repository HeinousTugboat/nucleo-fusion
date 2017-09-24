import { PrestigeService } from '../../core/prestige.service';
import { DataService } from '../../core/data.service';
import { UpdateService } from '../../core/update.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css']
})
export class ScorecardComponent implements OnInit {

  constructor(public updateService: UpdateService,
    public dataService: DataService,
    public prestigeService: PrestigeService) { }

  ngOnInit() {
    this.dataService.getTotalRate();
  }

  getElapsed(marker?: number) {
    let now, time, start;
    if (marker) {
      now = Date.now();
      time = now - marker;
    } else {
      now = this.updateService.time;
      start = this.updateService.start;
      time = now - start;
    }
    let seconds: number | string = Math.floor(time / 1000);
    let minutes: number | string = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    const hours = Math.floor(minutes / 60);
    minutes -= hours * 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return `${hours}:${minutes}:${seconds}`;
  }

}
