import { DataService } from '../../core/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public activePanel = 'generator';
  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  toggle(panel) {
    this.activePanel = panel;
  }

}
