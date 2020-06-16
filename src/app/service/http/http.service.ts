import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private backAdress : String;

  constructor(private http : HttpClient) { 
    this.backAdress = 'http://localhost:8080';
  }

  public get<T> (url : string) : Observable<T>{
    return this.http.get<T>(this.backAdress + url).pipe( catchError(this.handleError));
  }

  public post<T>(url : string, body : any){
    return this.http.post<T>(this.backAdress+url, body);
  }

  private handleError (error : any){
      //TODO: gérer les erreurs à l'aide d'un service
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
  }
}
