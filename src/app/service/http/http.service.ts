import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as conf from '../../../../optimapp.conf.json';
import { NotificationService } from '../notification/notification.service';

const backAdress : string = conf.back.adress;
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient, private notificationService : NotificationService) { 
  }

  public get<T> (url : string) : Observable<T>{
    return this.http.get<T>(backAdress + url).pipe( catchError( (error) => this.handleError(error) ));
  }

  public post<T>(url : string, body : any){
    return this.http.post<T>(backAdress+url, body).pipe( catchError(this.handleError));
  }

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
