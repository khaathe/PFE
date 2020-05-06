import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/service/activity/activity.service';
import { Activity } from 'src/app/model/activity.model';

@Component({
  selector: 'app-imputation-temps',
  templateUrl: './imputation-temps.component.html',
  styleUrls: ['./imputation-temps.component.scss']
})
export class ImputationTempsComponent implements OnInit {

  day : Array<Activity>;

  activityType: Array<String>;

  selectedDate : Date;

  constructor(private activityService : ActivityService) { 

  }

  ngOnInit(): void {
    this.activityType = this.activityService.getActivityType();
    this.selectedDate = null;
    
    this.day = [];
    let morning = new Activity();
    morning.setPeriod('MATIN');
    this.day.push(morning);
    
    let afternoon = new Activity();
    afternoon.setPeriod('APRES_MIDI');
    this.day.push(afternoon);
  }

  saveInput = function () : void {
    alert('inputSaved');
    console.log('%o', this.day);
  }

  reset = function () : void {
    console.log("reset");
    this.selectedDate = null;
  }

  dateClick = function (date) : void {
    this.selectedDate = date;
    this.day = this.activityService.findActivityByDate(date);
  }
}
