import { UpdateService } from '../../core/update.service';
import { DataService } from '../../core/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab-settings',
  templateUrl: './lab-settings.component.html',
  styleUrls: ['./lab-settings.component.css']
})
export class LabSettingsComponent implements OnInit {

  constructor(public dataService: DataService,
    public updateService: UpdateService) { }

  ngOnInit() {
  }
  reset() {
    this.dataService.initialize({});
  }
}
