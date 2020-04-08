import { Component, OnInit } from '@angular/core';
import {Product} from '../../_models/product.model';
import {PRODUCTS} from '../../MockProduct';
import {ProductService} from '../../_services/product.service';
import {ProductQuery} from "../../_models/ProductQuery";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
  // providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {

  product: any;
  // product = PRODUCTS[0];
  constructor(private api: ProductService ) {
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
    this.api.addToCart(this.product.id);
  }
}
