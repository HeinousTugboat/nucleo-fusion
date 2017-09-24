import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataService } from './data.service';
import { PrestigeService } from './prestige.service';
import { UpdateService } from './update.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    UpdateService,
    DataService,
    PrestigeService
  ]
})
export class CoreModule { }
