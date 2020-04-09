import { Component, OnInit } from '@angular/core';
import {AuthentificationComponent} from './authentification/authentification.component';
import { Router } from '@angular/router';
import { ConnectionService } from './service/connection/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  opened : boolean;

  constructor (private router : Router, private connectionService : ConnectionService ){
    console.log("init app");
    this.opened = false;
    this.router = router;
    let connectionObservable = this.connectionService.getConnectionObservable();
    connectionObservable.subscribe( (connected) => {
      if ( connected ){
        this.router.navigate(['accueil']);
        connectionObservable.unsubscribe();
      }
    });
  }
  
  ngOnInit(): void {
  }
  
}
