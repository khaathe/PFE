import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../user/user.service';
import { HttpService } from '../http/http.service';
import { User } from 'src/app/model/user.model';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private connectionSubject : Subject<boolean>;
  private connected : boolean;

  constructor(private userService : UserService, private httpService : HttpService, private notificationService : NotificationService) {
    console.log("ConnectionService.constructor")
    this.connected = false;
    this.connectionSubject = new Subject<boolean>();
  }
  

  getConnectionSubject () {
    return this.connectionSubject.asObservable();
  }

  connectUser (idU : string, password : string) : void{
    this.httpService.get<any>('/connect?idU='+idU+"&password="+password).subscribe( response => this.initUserInfo(idU) )
  }

  private initUserInfo (idU : string){
    this.httpService.get<User>('/user?idU='+idU).subscribe( (response) => {
      this.userService.user = response;
      this.connected = true;
      this.connectionSubject.next(this.connected);
      this.notificationService.showSucess("L'utilisateur a été connecté avec succès.", "Connexion");
    })
  }

  isConnected () : boolean {
    return this.connected;
  }

  deconnect () {
    this.connected = false;
    this.connectionSubject.next(this.connected);
    this.userService.resetUserInfo();
  }

}
