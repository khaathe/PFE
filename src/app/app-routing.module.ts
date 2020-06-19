import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ImputationTempsComponent} from './component/imputation-temps/imputation-temps.component';
import {AccueilComponent} from './component/accueil/accueil.component';
import { CalculTempsActiviteComponent } from './component/calcul-temps-activite/calcul-temps-activite.component';
import { CreationActiviteComponent } from './component/creation-activite/creation-activite/creation-activite.component';
import { CreationUserComponent } from './component/creation-user/creation-user/creation-user.component';
import { ChangerMdpUserComponent } from './component/changer-mdp-user/changer-mdp-user.component';

const routes: Routes = [
  { path : '', component : AccueilComponent },
  { path : 'imputations-temps', component : ImputationTempsComponent },
  { path : 'calcul-temps-activite', component : CalculTempsActiviteComponent},
  { path : 'creation-activite', component : CreationActiviteComponent},
  { path : 'creation-user', component : CreationUserComponent},
  { path : 'changer-mdp-user', component : ChangerMdpUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
