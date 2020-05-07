import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user : User;

  constructor() {
    this._user = new User();
    this._user.name = 'SPINICCI';
    this._user.firstName = 'Kévin';
    this._user.role = 'ADMIN';
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
      { text : "Changer son mot de passe", route : ""},
      { text : "Exporter les données", route : ""},
      { text : "Créer une tâche", route : ""},
      { text : "Clôturer une tâche", route : ""},
      { text : "Ré-activer une tâche", route : ""},
      { text : "Ajouter un utilisateur", route : ""},
      { text : "Supprimer un utilisateur", route : ""}
    ];
    return actions;
  }

}
