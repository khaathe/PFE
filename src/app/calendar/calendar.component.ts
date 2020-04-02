import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    
  }
  
  defaultView = "dayGridMonth";
  calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin];
  locale = "fr";
  firstDay = 1;
  aspectRatio = 2.0;
  header = {
    left:   'title',
    center: 'prevYear,prev today next,nextYear',
    right:  'timeGridWeek,dayGridMonth listWeek'
  };
  buttonText = {
    today:    'Aujourd\'hui',
    month:    'Mois',
    week:     'Semaine',
    day:      'Jour',
    list:     'Liste Semaine'
  };
  events=[ {title : 'Titre', date : '2020-04-02'} ];

  addEvent(){

  }

  removeEvent(){
    
  }

}
