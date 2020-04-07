import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpOptions: any;

  public username: string;

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private httpClient: HttpClient) {

   }
  registerUser(userData): Observable<any>{
    return this.httpClient.post(this.baseurl + '/register/', userData, { headers: this.httpHeaders });
  }

  loginUser(userData): Observable<any>{
    return this.httpClient.post(this.baseurl + '/auth/', userData, { headers: this.httpHeaders });
  }
}
