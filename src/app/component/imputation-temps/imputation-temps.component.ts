import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/service/activity/activity.service';
import { Activity } from 'src/app/model/activity.model';
import { ActivityType } from 'src/app/model/activityType.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-imputation-temps',
  templateUrl: './imputation-temps.component.html',
  styleUrls: ['./imputation-temps.component.scss']
})
export class ImputationTempsComponent implements OnInit {

  day : Array<Activity>;

  activityType: Array<ActivityType>;

  selectedDate : Date;

  private static DEFAULT_DAY : Array<Activity>;

  constructor(private activityService : ActivityService) {
    ImputationTempsComponent.DEFAULT_DAY = [];
    let morning = new Activity();
    morning.period = 'MATIN';
    ImputationTempsComponent.DEFAULT_DAY.push(morning);
    
    let afternoon = new Activity();
    afternoon.period = 'APRES_MIDI';
    ImputationTempsComponent.DEFAULT_DAY.push(afternoon);
  }

  ngOnInit(): void {
    this.activityType = this.activityService.activityType;
    this.selectedDate = null;
    this.day = _.clone(ImputationTempsComponent.DEFAULT_DAY);
  }

  saveInput = function () : void {
    this.activityService.saveActivities(this.day);
  }

  reset = function () : void {
    this.selectedDate = null;
  }

  dateClick = function (date) : void {
    this.selectedDate = date;
    let a = this.activityService.findActivityByDate(date);
    if(a.length>0) { this.day = a;}
    else {this.day.forEach(a => {
      a.date = _.clone(date);
    }); }
  }
}
