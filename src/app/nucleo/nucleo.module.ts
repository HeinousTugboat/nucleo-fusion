import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParticleGeneratorPanelComponent } from './particle-generator-panel/particle-generator-panel.component';
import { ParticleGeneratorComponent } from './particle-generator/particle-generator.component';
import { UpgradePanelComponent } from './upgrade-panel/upgrade-panel.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CardComponent,
    ParticleGeneratorComponent,
    UpgradeComponent,
    ParticleGeneratorPanelComponent,
    UpgradePanelComponent,
    DashboardComponent
  ]
})
export class NucleoModule { }
