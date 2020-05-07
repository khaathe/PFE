import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../service/connection/connection.service';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-bar-navigation',
  templateUrl: './bar-navigation.component.html',
  styleUrls: ['./bar-navigation.component.scss']
})
export class BarNavigationComponent implements OnInit {

  user : User;

  private _actions : Array<any>;

  constructor(private connectionService : ConnectionService, private userService : UserService) { 
    
  }

  ngOnInit(): void {
    this.user = this.userService.user;
    this.connectionService.getConnectionSubject().subscribe({
      next : connected => {
        if(connected) { this._actions = this.userService.getUserActions(); }
        else {this._actions = null;}
       }
    });
  }

  get actions () {
    return this._actions;
  }

  deconnect = function () {
    this.connectionService.deconnect();
  }
}
