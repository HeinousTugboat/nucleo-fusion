import { DataService } from '../../core/data.service';
import { UpgradeType } from '../../models/upgrade.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  @Input() upg: UpgradeType;

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  purchase(upg: UpgradeType) {
    const cost = upg.getCost();
    if (cost <= this.dataService.current) {
      this.dataService.current -= cost;
      upg.purchase();
    }
    this.dataService.save();
  }

}
