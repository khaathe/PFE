import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ActivityService } from 'src/app/service/activity/activity.service';
import * as moment from 'moment';
import { Activity } from 'src/app/model/activity.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  
  defaultView : string;
  calendarPlugins : Array<any>;
  locale : string;
  firstDay : number;
  aspectRatio : number;
  header : any; 
  buttonText : any; 
  events : Array<any>;
  @Output() dateClickEvent = new EventEmitter<Date>();

  constructor( private activityService : ActivityService) {
  }

  ngOnInit(): void {
    this.defaultView = "dayGridMonth";
    this.calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin];
    this.locale = "fr";
    this.firstDay = 1;
    this.aspectRatio = 5.0;
    this.header = {
      left:   'title',
      center: 'prevYear,prev today next,nextYear',
      right:  'timeGridWeek,dayGridMonth listWeek'
    };
    this.buttonText = {
      today:    'Aujourd\'hui',
      month:    'Mois',
      week:     'Semaine',
      day:      'Jour',
      list:     'Liste Semaine'
    };
    this.activityService.getListActivities().subscribe(
      (response) => {
        console.log("ImputationTempsComponent.ngOnInit - activityType=%o", response);
        this.initEvent(response);
      }
    );
    this.activityService.activityObservable.subscribe({
      next: listActivities => this.initEvent(listActivities)
    });
  }

  dateClick = function (info) {
    this.dateClickEvent.emit(info.date);
  }

  initEvent(listActivities : Array<Activity>){
    console.log("CalendarComponent.initEvent - listActivities=%o", listActivities);
    let events=[];
    listActivities.forEach(a => {
      console.log({title: a.activityType, date : moment(a.dateActivity).format('yyyy-MM-DD')});
      events.push( {title: a.activityType, date : moment(a.dateActivity).format('yyyy-MM-DD')} );
    });
    this.events = events;
  }

}
