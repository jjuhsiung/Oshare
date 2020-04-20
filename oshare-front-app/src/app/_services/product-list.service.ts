import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {baseurl} from "../MockComments";

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  baseurl = baseurl;
  // baseurl = 'http;//127.0.0.1:8000';
  // baseUrl: 'http://ec2-54-183-253-130.us-west-1.compute.amazonaws.com:8000';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getProductList(): Observable <any> {
    // TODO: product-list or search-result-page?
    return this.http.get(this.baseurl + '/product-list/', {headers: this.httpHeaders});
  }
}
