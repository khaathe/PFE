import { Injectable } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { ActivityType } from 'src/app/model/activityType.model';
import { Subject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { UserService } from '../user/user.service';
import * as moment from 'moment';
import { HttpService } from '../http/http.service';

/**
 * Service de gestion des activités
 */
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  /** Observable des activités */
  private activitySubject : Subject< Array<Activity> >;

  /**
   * Constructeur
   * @param httpService service pour les appels http
   * @param userService service de gestion des utilisateurs
   */
  constructor(private httpService : HttpService, private userService : UserService) {   
    this.activitySubject = new Subject<Array<Activity>>();
  }

  /**
   * Getter
   * @returns un observable pour les activités
   */
  get activityObservable () {
    return this.activitySubject.asObservable();
  }

  /**
   * Méthode pour récupérer les types d'activités
   * @returns un observable pour la récupération des types d'activités
   */
  getActivityType (state : string) {
    console.log("ActivityService.getActivityType");
    let url = state ? '/activity/type?state=' + state : '/activity/type';
    return this.httpService.get<Array<ActivityType>>(url);
  }

  /**
   * Méthode pour récupérer les activités imputées
   * @returns un observable pour la récupération des activités
   */
  getListActivities (){
    console.log("ActivityService.getListActivities - [idU=%s]", this.userService.user.idU);
    return this.httpService.get<Array<Activity>>("/activity?idU="+this.userService.user.idU);
  }

  /**
   * Sauvegarde les activités imputés et récupére les informations mise à jour
   * avec les nouvelles activité sauvgardées.
   * @param activities liste des activtés à sauvegarder
   * @returns un observable
   */
  saveActivities (activities : Array<Activity> ){
    console.log("ActivityService.saveActivities - %o", activities);
    return this.httpService.post<Array<Activity>>("/activity", {"activities" : activities, "idU" : this.userService.user.idU} );
  }

  /**
   * Récupère le temps passé par activité par utilisateur
   * @param start date de début
   * @param end date de fin
   * @param idU identifiant de l'utilisateur (peut être null)
   */
  getTimeUserSpentByActivity = function (start:Date, end:Date, idU:string) : Array<any>{
    console.log("ActivityService.getTimeUserSpentByActivity - start=%s, end=%s, idU=%s", start, end, idU);
    let url : string = "/calcul-temps-activite?dateMin=" + moment(start).format('YYYY-MM-DD') 
    + "&dateMax=" + moment(end).format('YYYY-MM-DD');
    if (idU){
      url = url + "&idU=" + idU;
    }
    return this.httpService.get(url);
  }

  /**
   * Créer une nouvelle activité
   * @param code code de l'activité
   * @param libelle libellé de l'activité
   */
  createActivity (code, libelle) : Observable<any>{
    return this.httpService.post<any>('/activity/type', { "code": code, "libelle" : libelle});
  }

  /**
   * Notifie tous lesw abonnés à l'observable des activités
   * @param listActivities nouvelle liste d'activité
   */
  emitActivitiesUpdate (listActivities : Array<Activity>) : void{
    this.activitySubject.next(listActivities);
  }

  /**
   * Mets à jours l'état de plusieurs activités.
   * @param listCode codes des activités àm mettre à jour
   * @param state nouvel état
   * @returns un observale pour la requête
   */
  updateActivityTypeState (listCode : Array<string>, state : string) {
    return this.httpService.post<Array<ActivityType>>('/activity/type/state', { "code" : listCode, "state" : state});
  }
}
