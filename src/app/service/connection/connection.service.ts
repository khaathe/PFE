import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../user/user.service';
import { HttpService } from '../http/http.service';
import { User } from 'src/app/model/user.model';
import { NotificationService } from '../notification/notification.service';

/**
 * Service de gestion de la connection
 */
@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  /** Observable pour la connection */
  private connectionSubject : Subject<boolean>;

  /** Indique si l'utilisateur est connecté ou non */
  private connected : boolean;

  /**
   * Constructeur
   * @param userService sevice de gestion des utilisateurs
   * @param httpService service d'appel http
   * @param notificationService service de gestion des notification
   */
  constructor(private userService : UserService, private httpService : HttpService, private notificationService : NotificationService) {
    console.log("ConnectionService.constructor")
    this.connected = false;
    this.connectionSubject = new Subject<boolean>();
  }

  /**
   * Getter
   * @returns un observable pour notifier si un utilisateur se connecte
   */
  getConnectionSubject () {
    return this.connectionSubject.asObservable();
  }

  /**
   * Connecte l'utilisateur et init les informations de l'utilisateur
   * @param idU identifiant
   * @param password mot de passe
   */
  connectUser (idU : string, password : string) : void{
    this.httpService.get<any>('/connect?idU='+idU+"&password="+password).subscribe( response => this.initUserInfo(idU) )
  }

  /**
   * Initialise les informations de l'utilisateur.
   * @param idU identifiant
   */
  private initUserInfo (idU : string){
    this.httpService.get<User>('/user?idU='+idU).subscribe( (response) => {
      this.userService.user = response;
      this.connected = true;
      this.connectionSubject.next(this.connected);
      this.notificationService.showSucess("L'utilisateur a été connecté avec succès.", "Connexion");
    })
  }

  /**
   * Indique si l'utilisateur est connecté
   * @returns true si l'utilisateur est connecté, false sinon
   */
  isConnected () : boolean {
    return this.connected;
  }

  /**
   * Déconnecte l'utilisateur
   */
  deconnect () {
    this.connected = false;
    this.connectionSubject.next(this.connected);
    this.userService.resetUserInfo();
  }

}
