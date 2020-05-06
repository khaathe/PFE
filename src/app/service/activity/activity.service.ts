import { Injectable } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private typeActivite : Array<string>;

  private day : Array<Activity>;

  constructor() { 
    this.typeActivite = [
      "Aucune",
      "Absent",
      "Congés",
      "Formation",
      "Administration",
      "Production",
      "Qualité et Réglementaire"
    ];

    this.day = [];
    let morning = new Activity();
    morning.setActivityType('Aucune');
    morning.setPeriod('MATIN');
    this.day.push(morning);
    
    let afternoon = new Activity();
    afternoon.setActivityType('Aucune');
    afternoon.setPeriod('APRES_MIDI');
    this.day.push(afternoon);

  }

  getDay = function () {
    return this.day;
  }

  getTypeActivite = function () : any {
    return this.typeActivite;
  }

  findActivityByDate = function(date){
      //todo : récupérer une activité à l'aide d'une date
      let day = new Array<Activity>();
      let morning = new Activity();
      morning.setActivityType('Production');
      morning.setPeriod('MATIN');
      morning.setComments("Une petite activité administrative un peu nulle");
      morning.setRAndD(true);
      day.push(morning);
      
      let afternoon = new Activity();
      afternoon.setActivityType('Aucune');
      afternoon.setPeriod('APRES_MIDI');
      day.push(afternoon);

      return day;  
  }

}
