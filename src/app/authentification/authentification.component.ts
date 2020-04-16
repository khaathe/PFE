import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../service/connection/connection.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit{

  constructor(private connectionService : ConnectionService) {
   }

  ngOnInit(): void {
    
  }

  connexion = function () {
    //TODO : récupérer les id et mdp user pour les envoyer au service et tenter une connexion
    let id : string = "";
    let password : string = "";
    this.connectionService.connectUser(id, password);
  }

}
