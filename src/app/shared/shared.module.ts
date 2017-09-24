import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DelayPipe } from './delay.pipe';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { TruncPipe } from './trunc.pipe';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    TruncPipe,
    DelayPipe,
    ScorecardComponent,
    SwitchComponent
],
  declarations: [DelayPipe, ScorecardComponent, TruncPipe, SwitchComponent]
})
export class SharedModule { }
