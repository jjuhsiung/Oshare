import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {PRODUCTS} from '../../MockProduct';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor() {
    this.getProduct();
  }

  ngOnInit(): void {
  }

  getProduct() {
    this.product = PRODUCTS[0];
  }

}
