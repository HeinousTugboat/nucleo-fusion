import { DataService } from './data.service';
import { UpdateService } from './update.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    UpdateService,
    DataService
  ]
})
export class CoreModule { }
