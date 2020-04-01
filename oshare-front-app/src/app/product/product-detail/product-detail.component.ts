import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {PRODUCTS} from '../../MockProduct';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  // product = PRODUCTS[0];
  constructor(private api: ProductService ) {
    // this.getProductDetail();
    this.product = PRODUCTS[0];
  }

  ngOnInit(): void {
  }

  getProductDetail = () => {
    this.api.getProductInfo().subscribe(
      data => {
        // TODO: split the data into two parts
        this.product = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
