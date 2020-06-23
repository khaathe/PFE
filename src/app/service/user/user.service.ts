import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { HttpService } from '../http/http.service';

/**
 * Service de gestion des utilisateurs.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /** Utilisateur connecté */
  private _user : User;

  /**
   * Constructeur
   * @param httpService service pour effectuer les appels http
   */
  constructor(private httpService : HttpService) {
    this._user = new User();
  }

  /**
   * Reset des infos utilisateurs
   */
  resetUserInfo = function(){
    this._user = new User();
  }

  /**
   * Setter de l'utilisateur
   */
  set user (user) {
    this._user = user;
  }

  /**
   * Getter de l'utilisateur
   */
  get user () {
    return this._user;
  }

  /**
   * Méthode pour récupérer les utilisateurs existants.
   * @returns un observable de la requête
   */
  getUsersList () {
    return this.httpService.get<Array<User>>('/user/all');
  }

  /**
   * Retourne les actions autorisées par le rôle de l'utilisateur
   * @returns la liste des actions de l'utilisateur
   */
  getUserActions () : Array<any>{
    let actions = [
      { text : "Imputer le temps", route : "imputations-temps"},
      { text : "Calcul du temps par activité", route : "calcul-temps-activite"},
      { text : "Changer son mot de passe", route : "changer-son-mdp"}      
    ];
    switch (this._user.role) {
      case 'ADMIN':
        actions.push({ text : "Gérer les activités", route : "gestion-activite"});
        actions.push({ text : "Ajouter un utilisateur", route : "creation-user"});
        actions.push({ text : "Changer le mot de passe d'un utilisateur", route : "changer-mdp-user"});
        break;

      default:
        break;
    }
    return actions;
  }

  /**
   * Renvoie les différents rôle possible pour un user
   * @returns un observable de la requête
   */
  getRole(){
    return this.httpService.get<any>('/role');
  }

  /**
   * Méthode de création d'un utilisateur
   * @param idU identifiant
   * @param password mot de passe
   * @param nom nom de l'utilisateur
   * @param prenom prénom de l'utilisateur
   * @param role rôle de l'utilisateur
   * @returns un observable de la requête
   */
  createUser(idU: string, password: string, nom: string, prenom: string, role: string){
    return this.httpService.post<any>('/user', {"idU": idU, "password": password, "nom": nom, "prenom": prenom, "role": role});
  }

  /**
   * Modifie le mot de passe d'un utilisateur
   * @param idU identifiant de l'utilisateur
   * @param password mot de passe de l'utilisateur
   * @returns un observable de la requête
   */
  changeUserPassword(idU : string, password : string){
    return this.httpService.post<any>('/user/password', {"idU":idU, "password" : password});
  }
}
