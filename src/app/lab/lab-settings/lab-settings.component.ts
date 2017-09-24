import { Component, OnInit } from '@angular/core';

import { DataService } from '../../core/data.service';
import { PrestigeService } from '../../core/prestige.service';
import { UpdateService } from '../../core/update.service';

@Component({
  selector: 'app-lab-settings',
  templateUrl: './lab-settings.component.html',
  styleUrls: ['./lab-settings.component.css']
})
export class LabSettingsComponent implements OnInit {

  constructor(public dataService: DataService,
    public updateService: UpdateService,
    private prestigeService: PrestigeService) { }

  ngOnInit() {
  }
  reset() {
    this.dataService.currentExotic = 0;
    this.dataService.currentVoid = 0;
    this.dataService.initialize({});
    this.dataService.startTime = Date.now();
  }
  exotic() {
    this.dataService.exoticPrestige();
  }
  void() {
    this.dataService.voidPrestige();
  }
  boost() {
    this.dataService.current *= 10;
  }
}
