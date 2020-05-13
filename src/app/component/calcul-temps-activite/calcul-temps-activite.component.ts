import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calcul-temps-activite',
  templateUrl: './calcul-temps-activite.component.html',
  styleUrls: ['./calcul-temps-activite.component.scss']
})
export class CalculTempsActiviteComponent implements OnInit {

  header : string[] = ['activity', 'time'];

  dataSource = [ 
    { activity : 'Conges', time : 5}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
