import { Injectable } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { ActivityType } from 'src/app/model/activityType.model';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';
import { User } from 'src/app/model/user.model';

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
      morning.date = new Date();
      this._listActivities.push(morning);
      
      let afternoon = new Activity();
      afternoon.period = 'APRES_MIDI';
      afternoon.activityType = 'CONGES';
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
      let activity = _.find(this._listActivities, {idA : a.idA, period : a.period, date : a.date});
      if(activity) { 
        activity.activityType = a.activityType;
        activity.comments = a.comments;
      }
      else {this._listActivities.push(a);}
    });
    this.activitySubject.next(this._listActivities);  
  }

  getTimeAllUserSpentByActivity = function(start:Date, end:Date) : Array<any>{
    return [
      { activity : 'Congés', time : 5},
      { activity : 'Administratif', time : 2},
      { activity : 'projet1', time : 10},
      { activity : 'projet2', time : 2},
      { activity : 'projet3', time : 10},
      { activity : 'projet4', time : 2},
      { activity : 'projet5', time : 10},
      { activity : 'projet7', time : 2},
      { activity : 'projet8', time : 10},
    ];
  }
  
  getTimeUserSpentByActivity = function (user:User, start:Date, end:Date) : Array<any>{
    return [
      { activity : 'Congés', time : 5},
      { activity : 'Administratif', time : 2},
      { activity : 'projet1', time : 10}
    ];
  }

  get listActivities (){
    return this._listActivities;
  }

}
