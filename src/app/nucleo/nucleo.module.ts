import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GeneratorPanelComponent } from './generator-panel/generator-panel.component';
import { GeneratorComponent } from './generator/generator.component';
import { UpgradePanelComponent } from './upgrade-panel/upgrade-panel.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [CardComponent, GeneratorComponent, UpgradeComponent, GeneratorPanelComponent, UpgradePanelComponent, DashboardComponent]
})
export class NucleoModule { }
