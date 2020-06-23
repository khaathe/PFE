import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityType } from 'src/app/model/activityType.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { ActivityService } from 'src/app/service/activity/activity.service';
import { NotificationService } from 'src/app/service/notification/notification.service';

/**
 * Component de gestion de l'écran de création des activités
 */
@Component({
  selector: 'app-gestion-activite',
  templateUrl: './gestion-activite.component.html',
  styleUrls: ['./gestion-activite.component.scss']
})
export class GestionActiviteComponent implements OnInit {

  
  /** Code de l'activité */
  code : string;

  /** libellé de l'activité */
  libelle : string;

  /** Header des colonnes du tableau */
  header : string[] = ['select', 'code', 'libelle', 'state'];

  /** Objet pour manipuler les données */
  dataSource = new MatTableDataSource<ActivityType>();

  /** Ligne sélectionnée dans le tableau */
  selection = new SelectionModel<ActivityType>(true, []);

  /** Composant pour assurer la pagination */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
    this.dataSource.paginator = this.paginator;
    this.activityService.getActivityType(null).subscribe( (response) => {
      this.dataSource.data = response;
    });
  }

  /**
   * Action du formulaire
   */
  onSubmit() : void {
    this.activityService.createActivity(this.code, this.libelle)
    .subscribe( (response) =>  {
      console.log("CreationActiviteComponent.onSubmit : response - %o", response);
      this.dataSource.data = response;
      this.notificationService.showSucess("L'activité a correctement été créée","Création activité")
    });
  }

  /**
   * Mets à jours l'état des activités actuellement sélectionnées et mets l'affichage des données.
   * @param state nouvel état des activités
   */
  updateActivityTypeState(state : string){
    let listCode = [];
    this.selection.selected.forEach( (a) => listCode.push(a.code));
    this.activityService.updateActivityTypeState(listCode, state).subscribe( (response) => {
      console.log('CreationActiviteComponent.activate - state : %s, listCode : %o, response : %o', state, listCode, response);
      this.dataSource.data = response;
      this.notificationService.showSucess("L'état des activités ont bien été étés mis à jour.", "MAJ Etat Activité");
      this.selection.clear();
    });
  }

  isUpdateButtonDisabled (){
    return this.selection.selected.length===0;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ActivityType): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} Activity : ${row.code}`;
  }


}

