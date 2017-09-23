import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabSettingsComponent } from './lab-settings/lab-settings.component';
import { UpdateListComponent } from './update-list/update-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LabSettingsComponent, UpdateListComponent]
})
export class LabModule { }
