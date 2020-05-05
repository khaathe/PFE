import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/service/activity/activity.service';

@Component({
  selector: 'app-imputation-temps',
  templateUrl: './imputation-temps.component.html',
  styleUrls: ['./imputation-temps.component.scss']
})
export class ImputationTempsComponent implements OnInit {

  journee: Array<any>;

  typeActivite: Array<String>;

  selectedDate : Date;

  constructor(private activityService : ActivityService) { 

  }

  ngOnInit(): void {
    this.typeActivite = this.activityService.getTypeActivite();

    //TODO: utiliser le constructeur de day
    this.journee = [
      {
        periode: "MATIN",
        rchDev : false,
        typeActivite : 'Aucune',
        descActivite : null
      },
      {
        periode: "APRES_MIDI",
        rchDev : false,
        typeActivite : 'Aucune',
        descActivite : null
      }
    ];

    this.selectedDate = null;
  }

  saveInput = function () : void {
    alert('inputSaved');
    console.log('%o', this.journee);
  }

  reset = function () : void {
    console.log("reset");
  }

  dateClick = function (date) : void {
    this.selectedDate = date;
    this.journee = this.activityService.findActivityByDate(date);
  }

}
