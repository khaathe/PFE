import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/service/activity/activity.service';
import { NotificationService } from 'src/app/service/notification/notification.service';

/**
 * Component de gestion de l'écran de création des activités
 */
@Component({
  selector: 'app-creation-activite',
  templateUrl: './creation-activite.component.html',
  styleUrls: ['./creation-activite.component.scss']
})
export class CreationActiviteComponent implements OnInit {

  /** Code de l'activité */
  code : string;

  /** libellé de l'activité */
  libelle : string;

  /**
   * Constructeur
   * @param activityService service de gestion des activités
   * @param notificationService service de gestion des notifications
   */
  constructor(private activityService : ActivityService, private notificationService : NotificationService) {
  }

  /**
   * Méthode init d'angular
   */
  ngOnInit(): void {
  }

  /**
   * Action du formulaire
   */
  onSubmit() : void {
    this.activityService.createActivity(this.code, this.libelle)
    .subscribe( (response) =>  this.notificationService.showSucess("L'activité a correctement été créée","Création activité") );
  }

}
