import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {baseurl} from "../MockComments";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseurl = baseurl;
  // baseurl = 'http://127.0.0.1:8000';
  // baseUrl: 'http://ec2-54-183-253-130.us-west-1.compute.amazonaws.com:8000';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  reviewsupdate = new Subject<any>();
  constructor(private http: HttpClient) { }

  addReview(headline: string, review: string, rating: number, product_id: number)
  {
    let para = new HttpParams().set('headline', headline).set('review', review)
      .set('rating', rating.toString()).set('product_id', product_id.toString())
      .set('user_id', localStorage.getItem('userId'));

    this.http.post<any>(this.baseurl + '/reviews/add_review/', para).subscribe(data => {
      console.log(data);
    });
  }

  // addReview(formData)
  // {
  //   return this.http.post<any>(this.baseurl + '/reviews/', formData);
  // }

  getReviews(product_id: number)
  {
    let para = new HttpParams().set('product_id', product_id.toString());

    this.http.get<any>(this.baseurl + '/reviews/get_product_reviews', {headers: this.httpHeaders, params: para}).subscribe(data => {
      this.reviewsupdate.next(data);
    });
  }


}
