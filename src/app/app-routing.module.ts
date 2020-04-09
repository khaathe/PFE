import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImputationTempsComponent} from './imputation-temps/imputation-temps.component';
import {AuthentificationComponent} from './authentification/authentification.component';
import {AccueilComponent} from './accueil/accueil.component';

const routes: Routes = [
  { path : '', component : AuthentificationComponent },
  { path : 'accueil', component : AccueilComponent },
  { path : 'imputations-temps', component : ImputationTempsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
