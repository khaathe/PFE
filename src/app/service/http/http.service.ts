import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private backAdress : String;

  constructor(private http : HttpClient) { 
    this.backAdress = 'http://localhost:8080';
  }

  public get(url) : Observable<any>{
    return this.http.get(this.backAdress + url);
  }
}
