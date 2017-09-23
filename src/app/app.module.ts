import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { LabModule } from './lab/lab.module';
import { NucleoModule } from './nucleo/nucleo.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, CoreModule, NucleoModule, LabModule, SharedModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
