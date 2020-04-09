import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  response_object = null;
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  httpClient: any;

  constructor(private http: HttpClient) { }

  getProfileById(id): Observable<any> {
    this.response_object = this.http.get(this.baseurl + '/profile/', { headers: this.httpHeaders });
    return this.response_object;
  }

  editProfile(formdata: any): Observable<any> {
    console.log("--edit profile--")
    return this.http.post<any>(this.baseurl + '/profile/', formdata);
  }
}
