import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ImputationTempsComponent} from './component/imputation-temps/imputation-temps.component';
import { CalculTempsActiviteComponent } from './component/calcul-temps-activite/calcul-temps-activite.component';
import { CreationActiviteComponent } from './component/creation-activite/creation-activite/creation-activite.component';
import { CreationUserComponent } from './component/creation-user/creation-user/creation-user.component';
import { ChangerMdpUserComponent } from './component/changer-mdp-user/changer-mdp-user.component';
import { ChangerSonMdpComponent } from './component/changer-son-mdp/changer-son-mdp.component';

const routes: Routes = [
  { path : 'imputations-temps', component : ImputationTempsComponent },
  { path : 'calcul-temps-activite', component : CalculTempsActiviteComponent},
  { path : 'creation-activite', component : CreationActiviteComponent},
  { path : 'creation-user', component : CreationUserComponent},
  { path : 'changer-mdp-user', component : ChangerMdpUserComponent},
  { path : 'changer-son-mdp', component : ChangerSonMdpComponent},
  //Redirection vers la page principale
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
