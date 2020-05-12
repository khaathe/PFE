import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user : User;

  constructor() {
    this._user = new User();
  }

  initUserInfo = function (){
    this._user.name = 'SPINICCI';
    this._user.firstName = 'Kévin';
    this._user.role = 'ADMIN';
  }

  resetUserInfo = function(){
    this._user = new User();
  }

  set user (user) {
    this._user = user;
  }

  get user () {
    return this._user;
  }

  getUserActions = function() : Array<any>{
    let actions = [
      { text : "Imputer le temps", route : "imputations-temps"},
      { text : "Calcul du temps par activité", route : "calcul-temps-activite"},
      { text : "Changer son mot de passe", route : ""},
      { text : "Exporter ses données", route : ""}
    ];
    switch (this._user._role) {
      case 'ADMIN':
        actions.push({ text : "Créer une tâche", route : ""});
        actions.push({ text : "Clôturer une tâche", route : ""});
        actions.push({ text : "Ré-activer une tâche", route : ""});
        actions.push({ text : "Ajouter un utilisateur", route : ""});
        actions.push(({ text : "Supprimer un utilisateur", route : ""}));
        break;

      default:
        break;
    }
    return actions;
  }

}
