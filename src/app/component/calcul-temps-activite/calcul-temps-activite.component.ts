import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user/user.service';
import { ActivityService } from 'src/app/service/activity/activity.service';

@Component({
  selector: 'app-calcul-temps-activite',
  templateUrl: './calcul-temps-activite.component.html',
  styleUrls: ['./calcul-temps-activite.component.scss']
})
export class CalculTempsActiviteComponent implements OnInit {

  header : string[] = ['activity', 'time'];

  dataSource = new MatTableDataSource<any>();

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
    this.userList = this.userService.getUsersList();
    this.userSelected = null;
    this.allUser = false;
    this.startDate = null;
    this.endDate = null;
  }

  getTimeUserSpentByActivity = function () {
    let data = [];
    if(this.allUser) {
      data = this.activityService.getTimeAllUserSpentByActivity(this.startDate, this.endDate);
    }
    else {
      data = this.activityService.getTimeUserSpentByActivity(this.userSelected, this.startDate, this.endDate);
    }
    this.dataSource.data = data;
  }

}
