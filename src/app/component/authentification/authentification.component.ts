import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../service/connection/connection.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit{
  
  id : string;
  password : string;
  
  constructor(private connectionService : ConnectionService) {
    this.id = null;
    this.password = null;
   }

  ngOnInit(): void {
    
  }

  connection = function () {
    //TODO : récupérer les id et mdp user pour les envoyer au service et tenter une connexion
    console.log('AuthentificationComponent.connexion');
    this.connectionService.connectUser(this.id, this.password);
  }

}
