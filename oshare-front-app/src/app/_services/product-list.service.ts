import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  baseurl = 'http;//127.0.0.1:8000';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getProductList(): Observable <any> {
    // TODO: product-list or search-result-page?
    return this.http.get(this.baseurl + '/product-list/', {headers: this.httpHeaders});
  }
}
