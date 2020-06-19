import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user/user.service';
import { NotificationService } from 'src/app/service/notification/notification.service';

@Component({
  selector: 'app-changer-son-mdp',
  templateUrl: './changer-son-mdp.component.html',
  styleUrls: ['./changer-son-mdp.component.scss']
})
export class ChangerSonMdpComponent implements OnInit {
  
  password : string;

  confirmPassword : string;

  constructor(private userService:UserService, private notificationService : NotificationService) {
  }

  ngOnInit(): void {
    this.password = null;
    this.confirmPassword = null;
  }

  onSubmit() : any {
    this.userService.changeUserPassword(this.userService.user.idU, this.password)
    .subscribe( (response) =>  this.notificationService.showSucess("Mot de passe correctement modifié","Modification mot de passe") );
  }
}
