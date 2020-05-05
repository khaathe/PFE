import { Injectable } from '@angular/core';
import { Observer, Observable, Subject } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private connectionSubject : Subject<boolean>;
  private connected : boolean;

  constructor(private userService : UserService) {
    console.log("ConnectionService.constructor")
    this.connected = false;
    this.connectionSubject = new Subject<boolean>();
  }
  

  getConnectionSubject = function () {
    return this.connectionSubject.asObservable();
  }

  connectUser = function (id : string, password : string) {
    //TODO : faire un appel pour connecter l'utilisateur
    this.connected = true;
    this.connectionSubject.next(this.connected);
  }

  isConnected = function () : boolean {
    return this.connected;
  }

  deconnect = function () {
    //TODO : vider les services associés
    this.connected = false;
    this.connectionSubject.next(this.connected);
  }

}
