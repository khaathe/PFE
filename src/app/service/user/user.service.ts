import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user : User;

  constructor(private httpService : HttpService) {
    this._user = new User();
  }

  initUserInfo = function (){
    this._user.idU = "kevins";
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

  getUsersList = function () {
    //Ajouté un type de retour ici généré une erreur
    return this.httpService.get('/user/all');
  }

  getUserActions = function() : Array<any>{
    let actions = [
      { text : "Imputer le temps", route : "imputations-temps"},
      { text : "Calcul du temps par activité", route : "calcul-temps-activite"}
    ];
    switch (this._user._role) {
      case 'ADMIN':
        actions.push({ text : "Créer une tâche", route : ""});
        actions.push({ text : "Ajouter un utilisateur", route : ""});
        break;

      default:
        break;
    }
    return actions;
  }

}
