import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ImputationTempsComponent} from './component/imputation-temps/imputation-temps.component';
import {AccueilComponent} from './component/accueil/accueil.component';

const routes: Routes = [
  { path : '', component : AccueilComponent },
  { path : 'imputations-temps', component : ImputationTempsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
