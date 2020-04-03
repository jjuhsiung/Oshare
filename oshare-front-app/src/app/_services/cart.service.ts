import { Injectable } from '@angular/core';
import { Product } from '../_models/product-count.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  product1 = {
    imgURL : "https://i.ibb.co/C23xGSj/u221.png",
    productName: "Product Name 1",
    count: 1,
    color: "001",
    price: 10,
  }

  product2 = {
    imgURL : "https://i.ibb.co/zXMt7Cg/zb-p.jpg",
    productName: "Product Name 2",
    count: 2,
    color: "002",
    price: 10,
  }

  products = [this.product1, this.product2];

  cart = {
    products: this.products,
    subtotal: 30,
    shipping: "Free",
    tax: "TBD"
  }

  addToCart(product: Product){
    if(this.products.includes(product)){
      product.count += 1;
    }else{
      this.products.push(product);
    }
  }

  updateProductCount(index: number, count: number){
    this.cart.products[index].count = count;
  }

  deleteProductByIndex(index){
    this.cart.products[index].count = 0;
  }

  getCart(){
    return this.cart;
  }

  constructor() { }
}
