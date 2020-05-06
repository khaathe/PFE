import { Injectable } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private activityType : Array<any>;

  private day : Array<Activity>;

  constructor() { 
    
    this.activityType = [
      { code : 'ABSENT', libelle : 'Absent'},
      { code : 'CONGES', libelle : 'Congés'},
      { code : 'FORMATION', libelle : 'Formation'},
      { code : 'ADMINISTRATION', libelle : 'Administration'},
      { code : 'PRODUCTION', libelle : 'Production'},
      { code : 'QUALITE_REGLEMENTAIRE', libelle : 'Qualité et Réglementaire'}
    ];

    this.day = [];
    let morning = new Activity();
    morning.setPeriod('MATIN');
    this.day.push(morning);
    
    let afternoon = new Activity();
    afternoon.setPeriod('APRES_MIDI');
    this.day.push(afternoon);

  }

  getDay = function () {
    return this.day;
  }

  getActivityType = function () : any {
    return this.activityType;
  }

  findActivityByDate = function(date){
      //todo : récupérer une activité à l'aide d'une date
      let day = new Array<Activity>();
      let morning = new Activity();
      morning.setActivityType('ADMINISTRATION');
      morning.setPeriod('MATIN');
      morning.setComments("Une petite activité administrative un peu nulle");
      morning.setRAndD(true);
      day.push(morning);
      
      let afternoon = new Activity();
      afternoon.setPeriod('APRES_MIDI');
      day.push(afternoon);

      return day;  
  }

}
