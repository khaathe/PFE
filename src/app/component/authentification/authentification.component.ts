import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../service/connection/connection.service';

/**
 * Component pour gérer l'authentification de l'utilisateur
 */
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit{
  
  /** Identifiant de l'utilisateur */
  id : string;
  
  /** Mot de passe de l'utilisateur */
  password : string;
  
  /** Constructeur */
  constructor(private connectionService : ConnectionService) {
    this.id = null;
    this.password = null;
   }

   /** Méthode init d'angular */
  ngOnInit(): void {
    
  }

  /**
   * Méthode de connexion de l'utilisateur avec l'identifiant et le mot de passe.
   * Vérifie que l'utilisateur et son mot de passe existe.
   * Si l'utilisateur n'existe pas, une erreur est renvoyé par l'appli.
   */
  connection = function () {
    console.log('AuthentificationComponent.connexion');
    this.connectionService.connectUser(this.id, this.password);
  }

}
