import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostImageService {

  constructor(private httpClient: HttpClient) { }
  
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ 'Content-Type': 'multipart/form-data'});

  uploadImage(imageData): Observable<any>{
    return this.httpClient.post(this.baseurl + '/postImages/', imageData);
  }

}
