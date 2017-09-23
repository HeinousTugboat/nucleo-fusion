import { UpdateService } from '../../core/update.service';
import { DataService } from '../../core/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.css']
})
export class UpdateListComponent implements OnInit {

  constructor(public dataService: DataService,
              public updateService: UpdateService) { }

  ngOnInit() {
  }

}
