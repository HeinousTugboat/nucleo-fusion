import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { GeneratorComponent } from './generator/generator.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { GeneratorPanelComponent } from './generator-panel/generator-panel.component';
import { UpgradePanelComponent } from './upgrade-panel/upgrade-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CardComponent, GeneratorComponent, UpgradeComponent, GeneratorPanelComponent, UpgradePanelComponent, DashboardComponent]
})
export class NucleoModule { }
