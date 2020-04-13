import { ProductCountService } from './../../_services/product-count.service';
import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../_services/product.service';
import {ProductQuery} from "../../_models/ProductQuery";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
  // providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {

  product: any;
  // product = PRODUCTS[0];
  constructor(private api: ProductService, private productCountService: ProductCountService ,private router: Router) {
    let query = new ProductQuery();
    query.id = this.api.currentproduct;
    api.getProductsInfo(query);
    api.productsupdate.subscribe(data=>{
      this.product = data['response']
    })
    console.log(this.product);
  }

  ngOnInit(): void {
  }

  add_to_cart() {
    this.productCountService.addToCart(this.product.id);
  }

  addReview() {
    this.router.navigate(['/add-review'], {
      queryParams: {
        'product_id': this.product.id,
        'product_title': this.product.name}
    });
  }
}
