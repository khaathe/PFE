import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { NotificationService } from 'src/app/service/notification/notification.service';

interface Role {
  code : string;
  libelle : string;
}

@Component({
  selector: 'app-creation-user',
  templateUrl: './creation-user.component.html',
  styleUrls: ['./creation-user.component.scss']
})
export class CreationUserComponent implements OnInit {

  idU : string;

  password : string;

  nom : string;

  prenom : string;

  role : string;

  listRoles : Array<Role>;

  constructor(private userService : UserService, private notificationService : NotificationService) { 
    this.userService.getRole().subscribe( (response) => this.listRoles=response );
  }

  ngOnInit(): void {
  }

  onSubmit() : any {
    this.userService.createUser(this.idU, this.password, this.nom, this.prenom, this.role)
    .subscribe( (response) =>  this.notificationService.showSucess("L'utilisateur a correctement été créée","Création d'Utilisateur") );
  }

}
