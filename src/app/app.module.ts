import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ImputationTempsComponent} from './imputation-temps/imputation-temps.component';
import {CalendarComponent} from './calendar/calendar.component';
import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FullCalendarModule} from '@fullcalendar/angular';
import {BarNavigationComponent} from './bar-navigation/bar-navigation.component';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {AuthentificationComponent} from './authentification/authentification.component';
import {AccueilComponent} from './accueil/accueil.component'; 
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ImputationTempsComponent,
    CalendarComponent,
    BarNavigationComponent,
    AuthentificationComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    FullCalendarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
