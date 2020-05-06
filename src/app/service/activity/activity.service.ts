import { Injectable } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { ActivityType } from 'src/app/model/activityType.model';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private _activityType : Array<ActivityType>;

  private _listActivities : Array<Activity>;

  private activitySubject : Subject< Array<Activity> >;

  constructor() {   
    this.initActivityType();
    this.initListActivities();
    this.activitySubject = new Subject<Array<Activity>>();
  }

  private initActivityType (){
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

   private initListActivities (){
      this._listActivities = [];
      //TODO : Appel BD
      let morning = new Activity();
      morning.activityType = 'ADMINISTRATION';
      morning.period = 'MATIN';
      morning.comments = "Une petite activité administrative un peu nulle";
      morning.rAndD = true;
      morning.date = new Date();
      this._listActivities.push(morning);
      
      let afternoon = new Activity();
      afternoon.period = 'APRES_MIDI';
      afternoon.date = new Date();
      this._listActivities.push(afternoon);
  }

  get activityType () {
    return this._activityType;
  }

  get activityObservable () {
    return this.activitySubject.asObservable();
  }

  findActivityByDate = function(date) : Array<Activity>{
      let dateMoment = moment(date);
      return _.filter(this._listActivities, a => {
        return dateMoment.isSame(a.date, 'day');
      });
  }

  saveActivities = function (activities : Array<Activity> ) {
    //TODO : faire un appel à la base de données
    _.forEach(activities, a => {
      this._listActivities.push(a);
    });
    this.activitySubject.next(this._listActivities);  
  }

  get listActivities (){
    return this._listActivities;
  }

}
