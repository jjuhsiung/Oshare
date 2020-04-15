import { ProductCountService } from './../_services/product-count.service';
import { ProductCount } from './../_models/product-count.model';
import { ProductService } from './../_services/product.service';
import { UserService } from './../_services/user.service';
import { CartService } from '../_services/cart.service';
import { Component, OnInit } from '@angular/core';
import { productListChangeArgs } from './product-count-list/product-count-list.component';
import { Cart } from '../_models/cart.model';
import { Product } from '../_models/product.model';

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

  constructor(
    private userService: UserService, 
    private productService: ProductService,
    private productCountService: ProductCountService) { 
    this.userService.getUserObjectById(localStorage.getItem('userId')).subscribe(
      Response =>{
        for(let i=0; i<Response.cart.productCounts.length; i++){
          this.productService.getProductByURL(Response.cart.productCounts[i].product).subscribe(
            product_data=>{
              var product = new Product(product_data.name,"", product_data.price, "", product_data.img_link, product_data.id);
              var productCount = new ProductCount(product, Response.cart.productCounts[i].count, Response.cart.productCounts[i].id);
              this.cart.products.push(productCount);
              this.cart.subtotal += productCount.count * product.Price;
            }, error=>{
              console.log(error);
            }
          )
        }
        //console.log(this.cart.products);
      }, error => {
        console.log(error);
      }
    )

  }

  productListChange(data){
    //this.cart.products[args.index].count = args.count;
    this.productCountService.updateProductCount(data.id, data.count).subscribe(
      response =>{
        console.log(response);
      }, error=>{
        console.log(error);
      }
    );
    for(var i=0; i<this.cart.products.length; i++){
      if(this.cart.products[i].id == data.id){
        this.cart.products[i].count = data.count;
        break;
      }
    }
    this.updateSubTotalPrice();
  }

  productListProductDelete(index){
    this.productCountService.deleteProductCount(index).subscribe();
    for(var i=0; i<this.cart.products.length; i++){
      if(this.cart.products[i].id == index){
        this.cart.products[i].count = 0;
        break;
      }
    }
    this.updateSubTotalPrice();
  }

  updateSubTotalPrice(){
    this.cart.subtotal = 0;
    for (let product of this.cart.products) {
      this.cart.subtotal += product.product.Price * product.count;
    }    
  }

  ngOnInit(): void {
  }

}
