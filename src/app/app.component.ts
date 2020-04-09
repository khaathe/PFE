import { Component, OnInit } from '@angular/core';
import {AuthentificationComponent} from './authentification/authentification.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  opened : boolean;

  constructor (private router : Router){
    console.log("init app");
    this.opened = false;
    this.router = router;
  }
  
  ngOnInit(): void {

  }

  
}
