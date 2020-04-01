import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {PRODUCTS} from '../../MockProduct';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor() {
    this.getProducts();
  }

  ngOnInit(): void {
  }

  getProducts() {
    this.products = PRODUCTS;
  }

}
