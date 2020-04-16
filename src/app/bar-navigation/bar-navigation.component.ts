import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../service/connection/connection.service';

@Component({
  selector: 'app-bar-navigation',
  templateUrl: './bar-navigation.component.html',
  styleUrls: ['./bar-navigation.component.css']
})
export class BarNavigationComponent implements OnInit {

  constructor(private connectionService : ConnectionService) { 
    
  }

  ngOnInit(): void {
  }

  user = "User";
  text = [

  ];

  buttons = [
    { text : "Imputer le temps", route : "imputations-temps"},
    { text : "Changer son mot de passe", route : ""},
    { text : "Exporter les données", route : ""},
    { text : "Créer une tâche", route : ""},
    { text : "Clôturer une tâche", route : ""},
    { text : "Ré-activer une tâche", route : ""},
    { text : "Ajouter un utilisateur", route : ""},
    { text : "Supprimer un utilisateur", route : ""}
  ];

  deconnect = function () {
    this.connectionService.deconnect();
  }
}
