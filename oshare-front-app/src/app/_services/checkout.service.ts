import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {baseurl} from "../MockComments";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseurl = baseurl;
  // baseurl = "http://127.0.0.1:8000";
  // baseUrl: 'http://ec2-54-183-253-130.us-west-1.compute.amazonaws.com:8000';

  constructor(private http: HttpClient) { }

  checkout(checkoutData): Observable<any> {
    return this.http.post<any>(this.baseurl + '/orders/checkout/', checkoutData);
  }

}
