import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr : ToastrService) { }

  showSucess (message: string, title : string){
    this.toastr.success(message, title, {
      timeOut : 5000
    });
  }

  showError (message : string, title : string){
    this.toastr.error(message, title, {
      disableTimeOut : true,
      closeButton : true
    })
  }
}
