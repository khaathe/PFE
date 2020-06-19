import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ImputationTempsComponent} from './component/imputation-temps/imputation-temps.component';
import {CalendarComponent} from './component/calendar/calendar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatInputModule} from '@angular/material/input'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FullCalendarModule} from '@fullcalendar/angular';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BarNavigationComponent} from './component/bar-navigation/bar-navigation.component';
import {AuthentificationComponent} from './component/authentification/authentification.component';
import {AccueilComponent} from './component/accueil/accueil.component';
import { CalculTempsActiviteComponent } from './component/calcul-temps-activite/calcul-temps-activite.component';
import { HttpClientModule } from '@angular/common/http';
import { CreationActiviteComponent } from './component/creation-activite/creation-activite/creation-activite.component';
import { CreationUserComponent } from './component/creation-user/creation-user/creation-user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { ChangerMdpUserComponent } from './component/changer-mdp-user/changer-mdp-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ImputationTempsComponent,
    CalendarComponent,
    BarNavigationComponent,
    AuthentificationComponent,
    AccueilComponent,
    CalculTempsActiviteComponent,
    CreationActiviteComponent,
    CreationUserComponent,
    ChangerMdpUserComponent
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
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
