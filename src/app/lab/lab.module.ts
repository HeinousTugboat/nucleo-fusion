import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LabSettingsComponent } from './lab-settings/lab-settings.component';
import { UpdateListComponent } from './update-list/update-list.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [LabSettingsComponent, UpdateListComponent]
})
export class LabModule { }
