import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/service/activity/activity.service';
import { NotificationService } from 'src/app/service/notification/notification.service';

@Component({
  selector: 'app-creation-activite',
  templateUrl: './creation-activite.component.html',
  styleUrls: ['./creation-activite.component.scss']
})
export class CreationActiviteComponent implements OnInit {

  code : string;

  libelle : string;

  constructor(private activityService : ActivityService, private notificationService : NotificationService) {
  }

  ngOnInit(): void {
  }

  onSubmit() : void {
    this.activityService.createActivity(this.code, this.libelle)
    .subscribe( (response) =>  this.notificationService.showSucess("L'activité a correctement été créée","Création activité") );
  }

}
