import { CartService } from './../../_services/cart.service';
import { ProductCountService } from './../../_services/product-count.service';
import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../_services/product.service';
import {ProductQuery} from "../../_models/ProductQuery";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
  // providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {

  product: any;
  productColor: any;
  myStyles = {
    'background-color': 'lime',
    'font-size': '20px',
    'font-weight': 'bold'
  }
  localStorage = localStorage;

  constructor(private api: ProductService,
              private productCountService: ProductCountService,
              private cartService: CartService,
              private router: Router,
              private route: ActivatedRoute) {
    let query = new ProductQuery();
    // query.id = this.api.currentproduct;
    query.id = parseInt(this.route.parent.snapshot.queryParamMap.get('product_id'));
    api.getProductsInfo(query);
    api.productsupdate.subscribe(data=>{
      this.product = data['response'];
      console.log(this.product);
      if (this.product.id!=null)
      {
        this.api.getProductColor(this.product.id).subscribe(
          product_color => {
            // console.log(product_data);
            this.productColor = product_color;
            console.log(this.productColor);
          }, error => {
            console.log(error);
          }
        )
      }
    })
    console.log(this.product);
  }

  ngOnInit(): void {
    // console.log(this.router);
    // let query = new ProductQuery();
    // // query.id = this.api.currentproduct;
    // query.id = parseInt(this.route.parent.snapshot.queryParamMap.get('product_id'));
    // this.api.getProductsInfo(query);
    // this.api.productsupdate.subscribe(data=>{
    //   this.product = data['response'];
    //   console.log(this.product);
    //   if(this.product.length==1 && this.product.id!=null) {
    //     this.api.getProductColor(this.product.id).subscribe(
    //       product_color => {
    //         // console.log(product_data);
    //         this.productColor = product_color;
    //         console.log(this.productColor);
    //       }, error => {
    //         console.log(error);
    //       }
    //     )
    //   }
    // })
    // console.log(this.product);
  }

  setMyStyles(color) {
    let styles = {
      'background-color': color.hex_value,
    };
    return styles;
  }

  add_to_cart() {
    if (localStorage.getItem('userToken') == null) {
      alert('Required Login!');
      location.reload();
    } else {
      this.productCountService.addToCart(this.product.id);
    }

  }

  reload(){
    window.location.reload();
  }


  addReview() {
    if (localStorage.getItem('userToken') == null) {
      alert('Required Login!');
      return;
      // this.router.navigate(['/login']);
    }
    console.log("add review");
    this.router.navigate(['/add-review'], {
      queryParams: {
        'product_id': this.product.id,
        'product_title': this.product.name,
        'product_img' : this.product.img_link,
      }
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
