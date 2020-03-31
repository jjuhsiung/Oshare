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

  constructor(private api: CartService) { 
    this.getCart();
  }

  getCart = () => {
    this.cart = this.api.getCart();
  }

  ngOnInit(): void {
  }

}
