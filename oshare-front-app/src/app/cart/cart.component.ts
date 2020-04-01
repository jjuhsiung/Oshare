import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]
})
export class CartComponent implements OnInit {

  cart = {
    products: [],
    subtotal: 0,
    shipping: "0",
    tax: "0"
  }

  product3 = {
    imgURL : "https://i.ibb.co/zXMt7Cg/zb-p.jpg",
    productName: "Product Name 3",
    count: 3,
    color: "003",
    price: 30,
  }

  constructor(private api: CartService) { 
    this.getCart();
  }

  getCart = () => {
    this.cart = this.api.getCart();
    this.updateSubTotalPrice();
  }

  addOneElement(){
    this.api.addToCart(this.product3);
    this.updateSubTotalPrice();
  }

  updateSubTotalPrice(){
    for (let product of this.cart.products) {
      this.cart.subtotal += product.price * product.count;
    }    
  }

  ngOnInit(): void {
  }

}
