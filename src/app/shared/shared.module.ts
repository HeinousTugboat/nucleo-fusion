import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelayPipe } from './delay.pipe';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { TruncPipe } from './trunc.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DelayPipe, ScorecardComponent, TruncPipe]
})
export class SharedModule { }
