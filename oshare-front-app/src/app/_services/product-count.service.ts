import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {baseurl} from "../MockComments";

@Injectable({
  providedIn: 'root'
})
export class ProductCountService {

  baseurl = baseurl;
  // baseurl = "http://127.0.0.1:8000";
  // baseUrl: 'http://ec2-54-183-253-130.us-west-1.compute.amazonaws.com:8000';
  constructor(private httpClient: HttpClient, private userService: UserService) { }

  updateProductCount(index: number, count: number){
    return this.httpClient.put<any>(this.baseurl + '/productCounts/' + index + '/', { "count" : count });
  }

  deleteProductCount(index: number){
    return this.httpClient.delete<any>(this.baseurl + '/productCounts/' + index + '/');
  }

  addToCart(productId: number){
    var cartId: number=0;

    this.userService.getCurrentUser().subscribe(
      response=>{
        cartId = response.cart.id;
        console.log(response);
        this.httpClient.post<any>(this.baseurl +'/productCounts/addToCart/',
         {"productId": productId, "cartId" : cartId}).subscribe(
          data=>{
            console.log(data);
          }
         );
      }, error =>{
        console.log(error);
      }
    )
    return;
  }

}
