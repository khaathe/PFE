import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as conf from '../../../../optimapp.conf.json';
import { NotificationService } from '../notification/notification.service';

/** Adresse du back pour faire des appels https */
const backAdress : string = conf.back.adress;

/**
 * Service pour les appels http
 */
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  /**
   * Constructeur
   * @param http service angular pour faire les appels http
   * @param notificationService service de notification
   */
  constructor(private http : HttpClient, private notificationService : NotificationService) { 
  }

  /**
   * Méthode pour effectuer des appels get
   * @param url url de la requête
   */
  public get<T> (url : string) : Observable<T>{
    //Attention ne pas faire  catchError(this.handleError) mais bien  catchError( (error) => this.handleError(error))
    //cela génére une erreur : this.notificationService is undefined
    //car on est plus dans la classe HttpService mais dans une classe angular
    return this.http.get<T>(backAdress + url).pipe( catchError( (error) => this.handleError(error) ));
  }

  /**
   * Méthode pour effectuer des appels post
   * @param url url de la requête
   * @param body corps de la requête
   */
  public post<T>(url : string, body : any){
    //Attention ne pas faire  catchError(this.handleError) mais bien  catchError( (error) => this.handleError(error))
    //cela génére une erreur : this.notificationService is undefined
    //car on est plus dans la classe HttpService mais dans une classe angular
    return this.http.post<T>(backAdress+url, body).pipe( catchError((error) => this.handleError(error)));
  }

  /**
   * Méthode de gestion des erreurs. Affiche une notification d'erreur à l'aide 
   * du service de notification. 
   * Log l'erreur dans la console.
   * @param error erreur http
   */
  private handleError (error : any){
    this.notificationService.showError("L'application a retourné le message : '"+error.error.message +"'", "Erreur lors de l'appel à l'application");
      //TODO: gérer les erreurs à l'aide d'un service
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error( "Backend returned code %o, body was: %o", error.status, error.error);
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later. Error is : %o', error);
  }
}
