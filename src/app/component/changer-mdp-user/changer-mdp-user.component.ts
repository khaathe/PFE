import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user/user.service';
import { NotificationService } from 'src/app/service/notification/notification.service';

/**
 * Component pour gérer l'écran de changement des mots de passe
 */
@Component({
  selector: 'app-changer-mdp-user',
  templateUrl: './changer-mdp-user.component.html',
  styleUrls: ['./changer-mdp-user.component.scss']
})
export class ChangerMdpUserComponent implements OnInit {

  /** Liste des utilisateurs existants */
  userList:Array<User>;

  /** Utilisateur sélectionné */
  userSelected:User;  

  /** Mot de passe */
  password : string;

  /** Confirmation du mot de passe */
  confirmPassword : string;

  /**
   * Constructeur
   * @param userService service de gestion des utilisateurs
   * @param notificationService service de gestion des notification
   */
  constructor(private userService:UserService, private notificationService : NotificationService) {
  }

  /**
   * Méthode init d'angular
   */
  ngOnInit(): void {
    this.userSelected = null;
    this.password = null;
    this.confirmPassword = null;
    this.userService.getUsersList().subscribe( (response)=>{
      this.userList = response;
    })
  }

  /**
   * Action du formulaire
   */
  onSubmit() : any {
    this.userService.changeUserPassword(this.userSelected.idU, this.password)
    .subscribe( (response) =>  this.notificationService.showSucess("Mot de passe correctement modifié","Modification mot de passe") );
  }

}
