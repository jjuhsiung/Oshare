import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { ProductCount } from '../_models/product-count.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {baseurl} from '../MockComments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseurl = baseurl;


  constructor(private httpClient: HttpClient) { }

  addToCart(product){
  }

  createNewCart(){
    // this.httpClient.post<any>(baseurl + '/register/');
  }
}
