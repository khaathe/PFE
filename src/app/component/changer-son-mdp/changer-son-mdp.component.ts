import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user/user.service';
import { NotificationService } from 'src/app/service/notification/notification.service';

/**
 * Component pour gérer le changement du mot de passe utilisateur
 */
@Component({
  selector: 'app-changer-son-mdp',
  templateUrl: './changer-son-mdp.component.html',
  styleUrls: ['./changer-son-mdp.component.scss']
})
export class ChangerSonMdpComponent implements OnInit {
  
  /** Mot de passe utilisateur */
  password : string;

  /** Confirmation du mot de passe */
  confirmPassword : string;

  /**
   * Constructeur
   * @param userService service de gestion des utilisateurs
   * @param notificationService service de gestion des notifications
   */
  constructor(private userService:UserService, private notificationService : NotificationService) {
  }

  /**
   * Méthode init d'angular
   */
  ngOnInit(): void {
    this.password = null;
    this.confirmPassword = null;
  }

  /**
   * Action du formulaire
   */
  onSubmit() : any {
    this.userService.changeUserPassword(this.userService.user.idU, this.password)
    .subscribe( (response) =>  this.notificationService.showSucess("Mot de passe correctement modifié","Modification mot de passe") );
  }
}
