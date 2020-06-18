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

  getUserActions () : Array<any>{
    let actions = [
      { text : "Imputer le temps", route : "imputations-temps"},
      { text : "Calcul du temps par activité", route : "calcul-temps-activite"}
    ];
    switch (this._user.role) {
      case 'ADMIN':
        actions.push({ text : "Créer une activité", route : "creation-activite"});
        actions.push({ text : "Ajouter un utilisateur", route : "creation-user"});
        break;

      default:
        break;
    }
    return actions;
  }

  getRole(){
    return this.httpService.get<any>('/role');
  }

  createUser(idU: string, password: string, nom: string, prenom: string, role: string){
    return this.httpService.post<any>('/user', {"idU": idU, "password": password, "nom": nom, "prenom": prenom, "role": role});
  }

}
