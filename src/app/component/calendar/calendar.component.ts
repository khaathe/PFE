import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ActivityService } from 'src/app/service/activity/activity.service';
import * as moment from 'moment';
import { Activity } from 'src/app/model/activity.model';

/**
 * Component de gestion du calendrier
 */
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  
  /** Vue par défaut */
  defaultView : string;

  /** Plugin de la librairie calendar à charger */
  calendarPlugins : Array<any>;

  /** langue du calendrier */
  locale : string;

  /** Premier jour de la semaine (Lundi) */
  firstDay : number;

  /** Ratio longueur-largeur du calendrier */
  aspectRatio : number;

  /** Header pour naviguer dans le calendrier */
  header : any; 

  /** Texte à afficher dans les boutons de navigation */
  buttonText : any; 

  /** Liste d'évènement à afficher dans le calendrier */
  events : Array<any>;

  /** Evénènement émis par le calendrier lorsqu'un utilisateur clique sur une date*/
  @Output() dateClickEvent = new EventEmitter<Date>();
  
  /**
   * Constructeur
   * @param activityService service de gestion des activités
   */
  constructor( private activityService : ActivityService) {
  }

  /**
   * Méthode init d'angular
   */
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
    this.activityService.activityObservable.subscribe({
      next: listActivities => this.initEvent(listActivities)
    });
  }

  /**
   * Emission d'un évènement dateClickEvent avec l'envoie de la date sélectionné par l'utilisateur
   * lorsque celui-ci clique sur le calendrier.
   * @param info information sur le clique utilisateur
   */
  dateClick = function (info) {
    this.dateClickEvent.emit(info.date);
  }

  /**
   * Initialisation des évènement du calendrier avec une liste d'activité
   * @param listActivities liste des activités
   */
  initEvent(listActivities : Array<Activity>){
    console.log("CalendarComponent.initEvent - listActivities=%o", listActivities);
    let events=[];
    if(listActivities){
      listActivities.forEach(a => {
        events.push( {title: a.activityType, date : moment(a.dateActivity).format('yyyy-MM-DD')} );
      });
    }
    this.events = events;
  }

}
