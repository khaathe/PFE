import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user : any;

  constructor() {
    this.user = null;
   }

  setUser = function (user) {
    this.user = user;
  }

  getUser = function () {
    return this.user;
  }

}
