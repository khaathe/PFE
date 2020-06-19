import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user/user.service';
import { NotificationService } from 'src/app/service/notification/notification.service';

@Component({
  selector: 'app-changer-mdp-user',
  templateUrl: './changer-mdp-user.component.html',
  styleUrls: ['./changer-mdp-user.component.scss']
})
export class ChangerMdpUserComponent implements OnInit {

  userList:Array<User>;

  userSelected:User;  

  password : string;

  confirmPassword : string;

  constructor(private userService:UserService, private notificationService : NotificationService) {
  }

  ngOnInit(): void {
    this.userSelected = null;
    this.password = null;
    this.confirmPassword = null;
    this.userService.getUsersList().subscribe( (response)=>{
      this.userList = response;
    })
  }

  onSubmit() : any {
    this.userService.changeUserPassword(this.userSelected.idU, this.password)
    .subscribe( (response) =>  this.notificationService.showSucess("Mot de passe correctement modifié","Modification mot de passe") );
  }

}
