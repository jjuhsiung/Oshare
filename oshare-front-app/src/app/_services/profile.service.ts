import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {baseurl} from "../MockComments";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  response_object = null;
  baseurl = baseurl;
  // baseurl = "http://127.0.0.1:8000";
  // baseUrl: 'http://ec2-54-183-253-130.us-west-1.compute.amazonaws.com:8000';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  httpClient: any;

  constructor(private http: HttpClient) { }

  getProfileByURL(profileURL: string): Observable<any> {
    return this.http.get<any>(profileURL);
  }

  editProfileByURL(profileURL: string, profileData){
    return this.http.patch<any>(profileURL, profileData);
  }

  editUser(formdata: any): Observable<any> {
    var id = localStorage.getItem("userId");
    return this.http.patch<any>(this.baseurl + '/update_user/' + id + '/', formdata);
  }
}
