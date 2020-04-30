import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

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

  constructor() {
  }

  ngOnInit(): void {
    this.defaultView = "dayGridMonth";
    this.calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin];
    this.locale = "fr";
    this.firstDay = 1;
    this.aspectRatio = 2.0;
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
    this.events=[ {title : 'Titre', date : '2020-04-02'} ];
  }

  dateClick = function (info) {
    this.dateClickEvent.emit(info.date);
  }

  addEvent(){

  }

  removeEvent(){
    
  }

}
