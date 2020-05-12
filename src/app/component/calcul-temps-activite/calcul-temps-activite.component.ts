import { Component, OnInit } from '@angular/core';

const HEADER = ['activity'];

@Component({
  selector: 'app-calcul-temps-activite',
  templateUrl: './calcul-temps-activite.component.html',
  styleUrls: ['./calcul-temps-activite.component.css']
})
export class CalculTempsActiviteComponent implements OnInit {

  header = HEADER.slice();

  body = [ 
    { activity : 'Conges', time : 5}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
