import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ImputationTempsComponent } from './imputation-temps/imputation-temps.component';
import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 

@NgModule({
  declarations: [
    AppComponent,
    ImputationTempsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
