import { UpgradeType } from '../../models/upgrade.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upgrade-panel',
  templateUrl: './upgrade-panel.component.html',
  styleUrls: ['./upgrade-panel.component.css']
})
export class UpgradePanelComponent implements OnInit {
  @Input() upgs: UpgradeType[];

  constructor() { }

  ngOnInit() {
  }

}
