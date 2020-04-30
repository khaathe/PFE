import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-imputation-temps',
  templateUrl: './imputation-temps.component.html',
  styleUrls: ['./imputation-temps.component.scss']
})
export class ImputationTempsComponent implements OnInit {

  a : any;

  journee: Array<any>;

  typeActivite: Array<String>;

  form : FormControl;

  libelle : any;

  constructor() { }

  ngOnInit(): void {
    this.libelle = {
      MATIN : 'Matin : ',
      APRES_MIDI : 'Après-Midi : '
    };

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
        typeActivite : null,
        descActivite : "Une petite activité pour le matin"
      },
      {
        periode: "APRES_MIDI",
        rchDev : false,
        typeActivite : null,
        descActivite : null
      }
    ];
  }

  private saveInput = function () : void {
    
  }

}
