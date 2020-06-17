import { Injectable } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { ActivityType } from 'src/app/model/activityType.model';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { User } from 'src/app/model/user.model';
import { UserService } from '../user/user.service';
import * as moment from 'moment';
import { HttpService } from '../http/http.service';

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

  saveActivities = function (activities : Array<Activity> ) {
    //Ajouté un type de retour ici généré une erreur
    console.log("ActivityService.saveActivities - %o", activities);
    this.httpService.post("/activity", {"activities" : activities, "idU" : this.userService.user.idU} )
    .subscribe( (response) => this.emitActivitiesUpdate(response) );
  }

  getTimeUserSpentByActivity = function(start:Date, end:Date, idU:string) : Array<any>{
    console.log("ActivityService.getTimeUserSpentByActivity - start=%s, end=%s, idU=%s", start, end, idU);
    let url : string = "/calcul-temps-activite?dateMin=" + moment(start).format('YYYY-MM-DD') 
    + "&dateMax=" + moment(end).format('YYYY-MM-DD');
    if (idU){
      url = url + "&idU=" + idU;
    }
    //Ajouté un type de retour ici généré une erreur
    return this.httpService.get(url);
  }

  emitActivitiesUpdate (listActivities){
    this.activitySubject.next(listActivities);
  }

}
