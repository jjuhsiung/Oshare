import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
    
  }

  baseurl = "http://127.0.0.1:8000";

  writeComment(commentData): Observable<any>{
    return this.httpClient.post<any>(this.baseurl + '/comments/', commentData);
  }
}
