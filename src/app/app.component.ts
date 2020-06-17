import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from './service/connection/connection.service';
import { Subscription } from 'rxjs';
import { IconService } from './service/icon/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public connected : boolean;
  private connectionSubscription : Subscription;

  constructor (private router : Router, private connectionService : ConnectionService, private icon : IconService){
    console.log("AppComponent.constructor");
    this.connected = this.connectionService.isConnected();
    this.router = router;
    let connectionSubject = this.connectionService.getConnectionSubject();
    this.connectionSubscription = connectionSubject.subscribe( (connected) => {
      this.connected = connected;
      if ( connected ){
        this.router.navigate(['']);
      }
    });
    console.debug("connected = %o", this.connected);
  }
  
  ngOnInit(): void {
  }

  ngOnDestroy() : void {
    this.connectionService.deconnect();
    this.connectionSubscription.unsubscribe();
  }
  
}
