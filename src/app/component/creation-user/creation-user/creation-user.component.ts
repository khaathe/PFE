import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { NotificationService } from 'src/app/service/notification/notification.service';

/**
 * Définition de la structure d'un rôle utilisateur
 */
interface Role {
  code : string;
  libelle : string;
}

/**
 * Component pour l'écran de création des utilisateurs
 */
@Component({
  selector: 'app-creation-user',
  templateUrl: './creation-user.component.html',
  styleUrls: ['./creation-user.component.scss']
})
export class CreationUserComponent implements OnInit {

  /** Id de l'utilisateur */
  idU : string;

  /** Mot de l'utilisateur */
  password : string;

  /** Confirmation du mot de passe de l'utilisateur */
  confirmPassword : string;

  /** Nom de l'utilisateur */
  nom : string;

  /** Prénom de l'utilisateur */
  prenom : string;

  /** Rôle de l'utilisateur */
  role : string;

  /** Liste des différents rôles existants */
  listRoles : Array<Role>;

  /**
   * Constructeur
   * @param userService service de gestion des utilisateurs
   * @param notificationService service de gestion des notifications
   */
  constructor(private userService : UserService, private notificationService : NotificationService) { 
    this.userService.getRole().subscribe( (response) => this.listRoles=response );
  }

  /**
   * Méthode init d'angular
   */
  ngOnInit(): void {
  }

  /**
   * Action du formulaire
   */
  onSubmit() : any {
    this.userService.createUser(this.idU, this.password, this.nom, this.prenom, this.role)
    .subscribe( (response) =>  this.notificationService.showSucess("L'utilisateur a correctement été créée","Création d'Utilisateur") );
  }

}
