import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private connectionObservable : Observable<boolean>;
  private connected : boolean;
  private user : any;

  constructor() { 
    this.connected = false;
    this.user = null;
    this.connectionObservable = new Observable<boolean> ( (Observer) => {
      let handler = setInterval( () => {
          Observer.next(this.connected)
      }, 500); 
      return () => clearInterval(handler);
    } );
  }
  

  getConnectionObservable = function () {
    return this.connectionObservable;
  }

  getUser = function () {
    return this.user;
  }

  setUserConnected = function (user : any) {
    this.user = user;
    this.connected = true;
  }

  isConnected = function () : boolean {
    return this.connected;
  }

}
