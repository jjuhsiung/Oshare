import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ProductQuery} from '../_models/ProductQuery';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  baseurl = 'http://127.0.0.1:8000';
  remoteurl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  productsupdate = new Subject<any>();
  // currentproduct: any;

  constructor(private http: HttpClient) {
  }

  getProductInfo(): Observable<any> {
    return this.http.get(this.baseurl + '/product/', {headers: this.httpHeaders});
  }

  getProductsInfo(query: ProductQuery) {
    console.log(query);
    let para = new HttpParams();
    if (query.id != 0) {
      para = para.set('id', query.id.toString());
    }
    if (query.ProductType != ''){
      para = para.set('type', query.ProductType);
    }
    if (query.ProductCategory != ''){
      para = para.set('category', query.ProductCategory);
    }
    if (query.ProductTags != ''){
      para = para.set('product_tags', query.ProductTags);
    }
    if (query.brand != ''){
      para = para.set('brand', query.brand);
    }
    if (query.PriceGreaterThan > 0){
       para = para.set('price_greater_than', query.PriceGreaterThan.toString());
    }
    if (query.PriceLessThan > 0){
      para = para.set('price_less_than', query.PriceLessThan.toString());
    }
    if (query.RatingGreaterThan > 0) {
      para = para.set('rating_greater_than', query.RatingGreaterThan.toString());
    }
    if (query.RatingLessThan > 0) {
      para = para.set('rating_less_than', query.RatingLessThan.toString());
    }
    if (query.input != '') {
      para = para.set('input', query.input);
    }
    console.log(para);

    this.http.get<any>(this.baseurl + '/products/search_product', {headers: this.httpHeaders, params: para}).subscribe(data => {
      this.productsupdate.next(data);
    });
  }

  addClick(id){
    let para = new HttpParams();
    if (id != 0) {
      para = para.set('id', id.toString());
    }
    this.http.post<any>(this.baseurl + '/products/add_click', para).subscribe(data => {
      console.log(data);
    });
    // this.http.post<any>(this.baseurl + '/products/add_click', {headers: this.httpHeaders, params: para}).subscribe(data => {
    //   this.productsupdate.next(data);
    // });
  }

  getProductByURL(product_url): Observable<any>{
    return this.http.get<any>(product_url);
  }

}
