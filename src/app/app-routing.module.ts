import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ImputationTempsComponent} from './component/imputation-temps/imputation-temps.component';
import {AccueilComponent} from './component/accueil/accueil.component';
import { CalculTempsActiviteComponent } from './component/calcul-temps-activite/calcul-temps-activite.component';

const routes: Routes = [
  { path : '', component : AccueilComponent },
  { path : 'imputations-temps', component : ImputationTempsComponent },
  { path : 'calcul-temps-activite', component : CalculTempsActiviteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
