import { Injectable } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { ActivityType } from 'src/app/model/activityType.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private activityType : Array<ActivityType>;

  constructor() {   
    this.initActivityType();
  }

  private initActivityType(){
    this.activityType = [];
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
      at.setCode(t.code);
      at.setLibelle(t.libelle);
      this.activityType.push(at);
    });
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
