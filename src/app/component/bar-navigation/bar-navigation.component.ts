import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../service/connection/connection.service';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user.model';

/**
 * Component pour gérer la bar de navigation
 */
@Component({
  selector: 'app-bar-navigation',
  templateUrl: './bar-navigation.component.html',
  styleUrls: ['./bar-navigation.component.scss']
})
export class BarNavigationComponent implements OnInit {

  /** Utilisateur connecté */
  user : User;

  /** Opération autorisé pour l'utilisateur */
  private _actions : Array<any>;

  /**
   * Constructeur
   * @param connectionService Service de gestion de la connexion
   * @param userService Service de gestion de l'utilisateur 
   */
  constructor(private connectionService : ConnectionService, private userService : UserService) { 
    
  }

  /**
   * Méthode init d'angular
   */
  ngOnInit(): void {
    this.user = this.userService.user;
    this.connectionService.getConnectionSubject().subscribe({
      next : connected => {
        if(connected) { 
          this.user = this.userService.user;
          this._actions = this.userService.getUserActions(); 
        }
        else {this._actions = null;}
       }
    });
  }

  /**
   * Getter
   */
  get actions () {
    return this._actions;
  }

  /**
   * Méthode de déconnexion
   */
  deconnect = function () {
    this.connectionService.deconnect();
  }
}
