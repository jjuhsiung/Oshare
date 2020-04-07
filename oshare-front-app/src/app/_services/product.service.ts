import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ProductQuery} from '../_models/ProductQuery';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseurl = 'http;//127.0.0.1:8000';
  remoteurl = '/api';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  productsupdate = new Subject<Array<object>>();

  constructor(private http: HttpClient) {
  }

  getProductInfo(): Observable<any> {
    return this.http.get(this.baseurl + '/product/', {headers: this.httpHeaders});
  }

  getProductsInfo(query: ProductQuery) {
    const para = new HttpParams();
    if (query.ProductType !== ''){
      para.set('product_type', query.ProductType);
    }
    if (query.ProductCategory !== ''){
      para.set('product_category', query.ProductCategory);
    }
    if (query.ProductTags !== ''){
      para.set('product_tags', query.ProductTags);
    }
    if (query.brand !== ''){
      para.set('brand', query.brand);
    }
    if (query.PriceGreaterThan > 0){
      para.set('price_greater_than', query.PriceGreaterThan.toString());
    }
    if (query.PriceLessThan > 0){
      para.set('price_less_than', query.PriceLessThan.toString());
    }
    if (query.RatingGreaterThan > 0){
      para.set('rating_greater_than', query.RatingGreaterThan.toString());
    }
    if (query.RatingLessThan > 0){
      para.set('rating_less_than', query.RatingLessThan.toString());
    }

    this.http.get<Array<object>>(this.remoteurl, {headers: this.httpHeaders, params: para}).subscribe(data => {
      this.productsupdate.next(data);
    });
  }
}
