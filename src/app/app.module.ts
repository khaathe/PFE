import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ImputationTempsComponent} from './component/imputation-temps/imputation-temps.component';
import {CalendarComponent} from './component/calendar/calendar.component';
import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FullCalendarModule} from '@fullcalendar/angular';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BarNavigationComponent} from './component/bar-navigation/bar-navigation.component';
import {AuthentificationComponent} from './component/authentification/authentification.component';
import {AccueilComponent} from './component/accueil/accueil.component';
import { CalculTempsActiviteComponent } from './component/calcul-temps-activite/calcul-temps-activite.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkTableModule} from '@angular/cdk/table'; 

@NgModule({
  declarations: [
    AppComponent,
    ImputationTempsComponent,
    CalendarComponent,
    BarNavigationComponent,
    AuthentificationComponent,
    AccueilComponent,
    CalculTempsActiviteComponent
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
    ReactiveFormsModule,
    MatPaginatorModule,
    CdkTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
