import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/service/activity/activity.service';

@Component({
  selector: 'app-creation-activite',
  templateUrl: './creation-activite.component.html',
  styleUrls: ['./creation-activite.component.scss']
})
export class CreationActiviteComponent implements OnInit {

  code : string;

  libelle : string;

  constructor(private activityService : ActivityService) {
  }

  ngOnInit(): void {
  }

  onSubmit() : void {
    this.activityService.createActivity(this.code, this.libelle).subscribe( (Response) => console.log(Response) );
  }

}
