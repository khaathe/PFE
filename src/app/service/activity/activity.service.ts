import { Injectable } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { ActivityType } from 'src/app/model/activityType.model';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { User } from 'src/app/model/user.model';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private activitySubject : Subject< Array<Activity> >;

  constructor(private httpService : HttpService, private userService : UserService) {   
    this.activitySubject = new Subject<Array<Activity>>();
  }

  get activityObservable () {
    return this.activitySubject.asObservable();
  }

  getActivityType () {
    console.log("ActivityService.getActivityType");
    return this.httpService.get<Array<ActivityType>>('/activity/type');
  }

  getListActivities (){
    console.log("ActivityService.getListActivities - [idU=%s]", this.userService.user.idU);
    return this.httpService.get<Array<Activity>>("/activity?idU="+this.userService.user.idU);
  }

  emitActivitiesUpdate (listActivities){
    this.activitySubject.next(listActivities);
  }

  saveActivities = function (activities : Array<Activity> ) {
    //TODO : faire un appel à la base de données
    this.httpService.post("/activity", {"activities" : activities, "idU" : this.userService.user.idU} ).subscribe( (response) => this.emitActivitiesUpdate(response) );
  }

  getTimeAllUserSpentByActivity = function(start:Date, end:Date) : Array<any>{
    //TODO : appel back
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
    //TODO : appel back
    return [
      { activity : 'Congés', time : 5},
      { activity : 'Administratif', time : 2},
      { activity : 'projet1', time : 10}
    ];
  }

}
