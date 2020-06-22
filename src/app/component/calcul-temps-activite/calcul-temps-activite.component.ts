import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user/user.service';
import { ActivityService } from 'src/app/service/activity/activity.service';

/**
 * Interface pour définir la structure des données renvoyées
 * par le back de l'appli
 */
interface UserTimeActivity{
  idU : string,
  nom: string,
  prenom : string,
  libelle : string,
  nbActivity : number
}

/**
 * Component pour gérer le calcul du temps passé par activité
 */
@Component({
  selector: 'app-calcul-temps-activite',
  templateUrl: './calcul-temps-activite.component.html',
  styleUrls: ['./calcul-temps-activite.component.scss']
})
export class CalculTempsActiviteComponent implements OnInit {

  /** Header des colonnes du tableau */
  header : string[] = ['idU', 'user', 'activityType', 'timeSpent'];

  /** Objet pour manipuler les données */
  dataSource = new MatTableDataSource<UserTimeActivity>();

  /** Liste des utilisateurs présent en base */
  userList:Array<User>;

  /** Utilisateur sélectionné */
  userSelected:User;  

  /** Si l'utilisateur veut récupérer les imputation de tout le monde */
  allUser:boolean;

  /** Début période de calcul du temps par activité */
  startDate:Date;

  /** Fin période de calcul du temps par activité  */
  endDate:Date;

  /** Composant pour assurer la pagination */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
   * Constructeur
   * @param userService service de gestion de l'user connecté
   * @param activityService service de gestion des activités
   */
  constructor(private userService:UserService, private activityService:ActivityService) {
  }

  /** Méthode init d'angular */
  ngOnInit(): void {
    this.dataSource.data = [];
    this.dataSource.paginator = this.paginator;
    this.userSelected = null;
    this.allUser = false;
    this.startDate = null;
    this.endDate = null;
    this.userService.getUsersList().subscribe( (response)=>{
      this.userList = response;
    })
  }

  /**
   * Récupération de l'activité passée par personnes et par activité
   */
  getTimeUserSpentByActivity = function () {
    let observable = this.allUser ? this.activityService.getTimeUserSpentByActivity(this.startDate, this.endDate, null) : 
    this.activityService.getTimeUserSpentByActivity(this.startDate, this.endDate, this.userSelected.idU);
    observable.subscribe( (response) => {
      this.dataSource.data = response;
    });
  }

}
