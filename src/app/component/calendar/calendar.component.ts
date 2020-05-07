import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ActivityService } from 'src/app/service/activity/activity.service';
import * as moment from 'moment';

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
    
    this.initEvent(this.activityService.listActivities);
    const activityObserver = {
      next: a => this.initEvent(a)
    };
    this.activityService.activityObservable.subscribe(activityObserver);
  }

  dateClick = function (info) {
    this.dateClickEvent.emit(info.date);
  }

  initEvent(listActivities){
    let events=[];
    listActivities.forEach(a => {
      events.push( {title: a.activityType, date : moment(a.date).format('yyyy-MM-DD')} );
    });
    this.events = events;
  }

}
