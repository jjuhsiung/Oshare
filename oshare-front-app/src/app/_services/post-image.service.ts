import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {baseurl} from "../MockComments";

@Injectable({
  providedIn: 'root'
})
export class PostImageService {

  constructor(private httpClient: HttpClient) { }

  // baseurl = "http://127.0.0.1:8000";
  baseurl = baseurl;
  // baseUrl: 'http://ec2-54-183-253-130.us-west-1.compute.amazonaws.com:8000';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'multipart/form-data'});

  uploadImage(imageData): Observable<any>{
    return this.httpClient.post<any>(this.baseurl + '/postImages/', imageData);
  }

  getImageByUrl(image_url): Observable<any>{
    console.log(image_url);
    return this.httpClient.get(image_url, { headers: this.httpHeaders })
  }

  getImagePath(image_url): string {
    this.getImageByUrl(image_url).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    return "";
  }

}
