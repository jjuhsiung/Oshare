import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseurl = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) { }

  checkout(checkoutData): Observable<any> {
    return this.http.post<any>(this.baseurl + '/orders/checkout/', checkoutData);
  }

}
