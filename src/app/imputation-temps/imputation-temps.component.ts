import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imputation-temps',
  templateUrl: './imputation-temps.component.html',
  styleUrls: ['./imputation-temps.component.scss']
})
export class ImputationTempsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  typeActivite = [
    "Absent",
    "Congés",
    "Formation",
    "Production",
    "Qualité et Réglementaire"
  ]

  matin = {
    periode : "matin",
    libelleChamp : "Matin : ",
    activite : null
  };

  apres_midi = {
    periode : "apres-midi",
    libelleChamp : "Après-Midi :",
    activite : null
  }

  journee = [
    this.matin,
    this.apres_midi
  ]

}
