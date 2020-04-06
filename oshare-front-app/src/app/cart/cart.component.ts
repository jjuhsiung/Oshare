import { CartService } from '../_services/cart.service';
import { Component, OnInit } from '@angular/core';
import { productListChangeArgs } from './product-count-list/product-count-list.component';

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
    imgURL : "https://www.sephora.com/productimages/sku/s2352342-main-zoom.jpg",
    productName: "Product Name 3",
    count: 3,
    color: "003",
    price: 30,
  }

  constructor(private cartService: CartService) { 
    this.getCart();
  }

  getCart = () => {
    this.cart = this.cartService.getCart();
    this.updateSubTotalPrice();
  }

  addOneElement(){
    this.cartService.addToCart(this.product3);
    this.updateSubTotalPrice();
  }

  productListChange(args: productListChangeArgs){
    //this.cart.products[args.index].count = args.count;
    this.cartService.updateProductCount(args.index, args.count);
    this.updateSubTotalPrice();
  }

  productListProductDelete(index){
    this.cartService.deleteProductByIndex(index);
    this.updateSubTotalPrice();
  }

  updateSubTotalPrice(){
    this.cart.subtotal = 0;
    for (let product of this.cart.products) {
      this.cart.subtotal += product.price * product.count;
    }    
  }

  ngOnInit(): void {
  }

}
