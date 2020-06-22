import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * Service pour les notifications de l'application
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /**
   * Constructeur
   * @param toastr service pour gérer les toast (notification)
   */
  constructor(private toastr : ToastrService) { }

  /**
   * Affiche un message de succès.
   * @param message message de la notification
   * @param title titre de la notification
   */
  showSucess (message: string, title : string){
    this.toastr.success(message, title, {
      timeOut : 5000
    });
  }

  /**
   * Affiche un message d'erreur.
   * @param message message de la notification
   * @param title titre de la notification
   */
  showError (message : string, title : string){
    this.toastr.error(message, title, {
      disableTimeOut : true,
      closeButton : true
    })
  }
}
