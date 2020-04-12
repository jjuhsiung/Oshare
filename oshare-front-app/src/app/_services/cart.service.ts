import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { ProductCount } from '../_models/product-count.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  addToCart(product){
    // if(this.products.includes(product)){
    //   product.count += 1;
    // }else{
    //   this.products.push(product);
    // }
  }



  constructor(private http: HttpClient) { }
}
