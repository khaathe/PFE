import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/service/activity/activity.service';
import { Activity } from 'src/app/model/activity.model';
import { ActivityType } from 'src/app/model/activityType.model';
import * as _ from 'lodash';
import * as moment from 'moment';
import { NotificationService } from 'src/app/service/notification/notification.service';

@Component({
  selector: 'app-imputation-temps',
  templateUrl: './imputation-temps.component.html',
  styleUrls: ['./imputation-temps.component.scss']
})
export class ImputationTempsComponent implements OnInit {

  day : Array<Activity>;

  activityType: Array<ActivityType>;

  selectedDate : Date;

  private activities : Array<Activity>;

  private static DEFAULT_DAY : Array<Activity>;

  constructor(private activityService : ActivityService, private notificationService : NotificationService) {
    ImputationTempsComponent.DEFAULT_DAY = [];
    let morning = new Activity();
    morning.period = 'MATIN';
    ImputationTempsComponent.DEFAULT_DAY.push(morning);
    
    let afternoon = new Activity();
    afternoon.period = 'APRES_MIDI';
    ImputationTempsComponent.DEFAULT_DAY.push(afternoon);
  }

  ngOnInit(): void {
    this.activityType = [];
    this.activityService.getActivityType().subscribe(
      (response) => { 
          console.log("ImputationTempsComponent.ngOnInit - activityType=%o", response);
          this.activityType = response;
      }
    );
    this.activityService.getListActivities().subscribe(
      (response) => {
        console.log("ImputationTempsComponent.ngOnInit - activities=%o", response);
        this.activities = response;
        this.activityService.emitActivitiesUpdate(this.activities);
      }
    );
    this.activityService.activityObservable.subscribe( (activities) => {
      this.activities=activities; 
      this.dateClick(this.selectedDate);
    });
    this.selectedDate = null;
    this.day = _.cloneDeep(ImputationTempsComponent.DEFAULT_DAY);
  }

  saveInput () : void {
    this.activityService.saveActivities(this.day).subscribe( (response) => {
      this.activityService.emitActivitiesUpdate(response);
      this.notificationService.showSucess("L'imputation a bien été enregistrée.","Imputation temps");
    });
  }
  
  private findActivityByDate (date) : Array<Activity>{
    let dateMoment = moment(date);
    return _.filter(this.activities, (a:Activity) => {
      return dateMoment.isSame(moment(a.dateActivity), 'day');
    });
  }

  dateClick (date) : void {
    this.selectedDate = date;
    let a = this.findActivityByDate(date);
    //On évite de modifier l'activité directement, par exemple si jamais l'utilisateur réinitialise le formulaire
    if(a.length>0) { this.day = _.cloneDeep(a);}
    else { 
      this.day = _.cloneDeep(ImputationTempsComponent.DEFAULT_DAY);
    }
    //On ajoute un jour la date sélectionné car lorsqu'on l'envoie à la BD
    //La date est enregistrée avec 1 jours en moins (surement car on envoie
    //un datetime alors que la BD prend un date)
    _.forEach(this.day, (a:Activity) => {
      a.dateActivity = moment(date).add(1, 'day').toDate();
    })
    if (this.day[0].period==='APRES_MIDI'){
      let tmpA = this.day[0];
      this.day[0] = this.day[1];
      this.day[1] = tmpA;
    }
  }

}
