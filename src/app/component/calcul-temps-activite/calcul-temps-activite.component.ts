import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user/user.service';
import { ActivityService } from 'src/app/service/activity/activity.service';

interface UserTimeActivity{
  idU : string,
  nom: string,
  prenom : string,
  libelle : string,
  nbActivity : number
}

@Component({
  selector: 'app-calcul-temps-activite',
  templateUrl: './calcul-temps-activite.component.html',
  styleUrls: ['./calcul-temps-activite.component.scss']
})
export class CalculTempsActiviteComponent implements OnInit {

  header : string[] = ['idU', 'user', 'activityType', 'timeSpent'];

  dataSource = new MatTableDataSource<UserTimeActivity>();

  userList:Array<User>;

  userSelected:User;  

  allUser:boolean;

  startDate:Date;

  endDate:Date;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private userService:UserService, private activityService:ActivityService) {
  }

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

  getTimeUserSpentByActivity = function () {
    let observable = this.allUser ? this.activityService.getTimeUserSpentByActivity(this.startDate, this.endDate, null) : 
    this.activityService.getTimeUserSpentByActivity(this.startDate, this.endDate, this.userSelected.idU);
    observable.subscribe( (response) => {
      this.dataSource.data = response;
    });
  }

}
