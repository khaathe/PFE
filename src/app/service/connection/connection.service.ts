import { Injectable } from '@angular/core';
import { Observer, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private connectionSubject : Subject<boolean>;
  private connected : boolean;
  private user : any;

  constructor() {
    console.log("ConnectionService.constructor")
    this.connected = false;
    this.user = null;
    this.connectionSubject = new Subject<boolean>();
    console.debug("connected = %o", this.connected);
  }
  

  getConnectionSubject = function () {
    return this.connectionSubject;
  }

  getUser = function () {
    return this.user;
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
    this.user = null;
    this.connected = false;
    this.connectionSubject.next(this.connected);
  }

}
