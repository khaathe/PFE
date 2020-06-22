import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivityService } from 'src/app/service/activity/activity.service';
import { Activity } from 'src/app/model/activity.model';
import { ActivityType } from 'src/app/model/activityType.model';
import * as _ from 'lodash';
import * as moment from 'moment';
import { NotificationService } from 'src/app/service/notification/notification.service';
import { ConnectionService } from 'src/app/service/connection/connection.service';
import { Subscription } from 'rxjs';

/**
 * Component de l'écran pour imputer le temps
 */
@Component({
  selector: 'app-imputation-temps',
  templateUrl: './imputation-temps.component.html',
  styleUrls: ['./imputation-temps.component.scss']
})
export class ImputationTempsComponent implements OnInit, OnDestroy {

  /** Information du jour sélectionné par l'utilisateur */
  day : Array<Activity>;

  /** Liste des différents types d'activités */
  activityType: Array<ActivityType>;

  /** Date sélectionné par l'utilisateur */
  selectedDate : Date;

  /** Liste des activités imputés par l'utilisateur */
  private activities : Array<Activity>;

  private connectionSubscription : Subscription;

  /** Jours vide */
  private static DEFAULT_DAY : Array<Activity>;

  /**
   * Constructeur
   * @param activityService service de gestion des activités
   * @param notificationService service de gestion des notifications
   * @param connectionService service de connection
   */
  constructor(private activityService : ActivityService, private notificationService : NotificationService, private connectionService : ConnectionService) {
    ImputationTempsComponent.DEFAULT_DAY = [];
    let morning = new Activity();
    morning.period = 'MATIN';
    ImputationTempsComponent.DEFAULT_DAY.push(morning);
    
    let afternoon = new Activity();
    afternoon.period = 'APRES_MIDI';
    ImputationTempsComponent.DEFAULT_DAY.push(afternoon);
  }

  /**
   * Méthode destroy d'angular
   */
  ngOnDestroy(): void {
    this.connectionSubscription.unsubscribe();
  }

  /**
   * Méthode init d'angular
   */
  ngOnInit(): void {
    this.activityType = [];
    //Récupération type d'activité
    this.activityService.getActivityType().subscribe(
      (response) => { 
          console.log("ImputationTempsComponent.ngOnInit - activityType=%o", response);
          this.activityType = response;
      }
    );
    //Abonnement service de connection
    this.connectionSubscription = this.connectionService.getConnectionSubject().subscribe( (value) => {
      //Récupération de la liste des activités quand on se connecte
      if(value) this.getListActivities();
    });
    //récupérationde la liste des activités quand on ouvre l'écran
    this.getListActivities();
    //Abonnement à chaque update d'activité
    this.activityService.activityObservable.subscribe( (activities) => {
      this.activities=activities; 
      this.dateClick(this.selectedDate);
    });
    this.selectedDate = null;
    this.day = _.cloneDeep(ImputationTempsComponent.DEFAULT_DAY);
  }

  getListActivities(){
    //Récupréation liste d'activité
    this.activityService.getListActivities().subscribe(
      (response) => {
        console.log("ImputationTempsComponent.ngOnInit - activities=%o", response);
        this.activities = response;
        this.activityService.emitActivitiesUpdate(this.activities);
      }
    );
  }

  /**
   * Sauvegarde de l'imputation réalisée par l'utilisateur
   */
  saveInput () : void {
    this.activityService.saveActivities(this.day).subscribe( (response) => {
      this.activityService.emitActivitiesUpdate(response);
      this.notificationService.showSucess("L'imputation a bien été enregistrée.","Imputation temps");
    });
  }
  
  /**
   * Recherche des activités par date.
   * @param date jour d'imputation de l'activité
   */
  private findActivityByDate (date) : Array<Activity>{
    let dateMoment = moment(date);
    return _.filter(this.activities, (a:Activity) => {
      return dateMoment.isSame(moment(a.dateActivity), 'day');
    });
  }

  /**
   * Méthode appelée lorsqu'un utilisateur clique sur une date.
   * Les informations des activités imputés à la date choisie par l'utilisateur
   * sont ensuite récupérée puis affichées à l'écran. Si l'utilisateur n'a pas réalisé 
   * d'imputation à la date sélectionnée, alors des informations vides sont chargées
   * (constante DEFAULT_DAY).
   * @param date date sélectionné par l'utilisateur
   */
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
