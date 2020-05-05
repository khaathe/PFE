import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private typeActivite : any;

  private journee : any;

  constructor() { 
    this.typeActivite = [
      "Aucune",
      "Absent",
      "Congés",
      "Formation",
      "Production",
      "Qualité et Réglementaire"
    ];

    this.journee = [
      {
        periode: "MATIN",
        rchDev : true,
        typeActivite : "Congés",
        descActivite : "Une petite activité pour le matin"
      },
      {
        periode: "APRES_MIDI",
        rchDev : false,
        typeActivite : 'Aucune',
        descActivite : null
      }
    ];

  }

  getTypeActivite = function () : any {
    return this.typeActivite;
  }

  findActivityByDate = function(date){
      //todo : récupérer une activité à l'aide d'une date
      return [
        {
          periode: "MATIN",
          rchDev : true,
          typeActivite : 'Administration',
          descActivite : 'Une petite activité administrative un peu nulle'
        },
        {
          periode: "APRES_MIDI",
          rchDev : false,
          typeActivite : 'Aucune',
          descActivite : null
        }
      ];;  
  }

}
