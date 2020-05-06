import { Injectable } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { ActivityType } from 'src/app/model/activityType.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private _activityType : Array<ActivityType>;

  constructor() {   
    this.initActivityType();
  }

  private initActivityType(){
    this._activityType = [];
    //TODO : initié avec les valeurs de la bd
    let type = [
      { code : 'ABSENT', libelle : 'Absent'},
      { code : 'CONGES', libelle : 'Congés'},
      { code : 'FORMATION', libelle : 'Formation'},
      { code : 'ADMINISTRATION', libelle : 'Administration'},
      { code : 'PRODUCTION', libelle : 'Production'},
      { code : 'QUALITE_REGLEMENTAIRE', libelle : 'Qualité et Réglementaire'}
    ];
    type.forEach(t => {
      let at = new ActivityType();
      at.code = t.code;
      at.libelle = t.libelle;
      this._activityType.push(at);
    });
  }

  get activityType () {
    return this._activityType;
  }

  findActivityByDate = function(date){
      //todo : récupérer une activité à l'aide d'une date
      let day = new Array<Activity>();
      let morning = new Activity();
      morning.activityType = 'ADMINISTRATION';
      morning.period = 'MATIN';
      morning.comments = "Une petite activité administrative un peu nulle";
      morning.rAndD = true;
      day.push(morning);
      
      let afternoon = new Activity();
      afternoon.period = 'APRES_MIDI';
      day.push(afternoon);

      return day;  
  }

}
