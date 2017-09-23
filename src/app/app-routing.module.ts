import { LabSettingsComponent } from './lab/lab-settings/lab-settings.component';
import { DashboardComponent } from './nucleo/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'lab', component: LabSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
