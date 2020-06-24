import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from './service/connection/connection.service';
import { Subscription } from 'rxjs';
import { IconService } from './service/icon/icon.service';

/**
 * Component pour l'application
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  /** Indique si un utilisateur est connecté */
  public connected : boolean;

  /** Abonnement à l'observable de la connexion */
  private connectionSubscription : Subscription;

  /**
   * Constructeur
   * @param router service angular de gestion des routes
   * @param connectionService service de connexion
   * @param icon service de gestion des icônes
   */
  constructor (private router : Router, private connectionService : ConnectionService, private icon : IconService){
    console.log("AppComponent.constructor");
    this.connected = this.connectionService.isConnected();
    this.router = router;
    let connectionSubject = this.connectionService.getConnectionSubject();
    this.connectionSubscription = connectionSubject.subscribe( (connected) => {
      this.connected = connected;
      if ( connected ){
        this.router.navigate(['imputations-temps']);
      }
    });
    console.debug("connected = %o", this.connected);
  }
  
  /**
   * Méthode init d'angular
   */
  ngOnInit(): void {
  }

  /**
   * Méthode destroy d'angular
   */
  ngOnDestroy() : void {
    this.connectionService.deconnect();
    this.connectionSubscription.unsubscribe();
  }
  
}
