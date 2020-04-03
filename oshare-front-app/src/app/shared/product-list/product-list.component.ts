import { Component, OnInit } from '@angular/core';
import {Product} from '../../_models/product.model';
import {PRODUCTS} from '../../MockProduct';
import {ProductListService} from '../../_services/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductListService]
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private api: ProductListService) {
    this.getProducts();
  }

  ngOnInit(): void {
  }

  getProducts() {
    this.products = PRODUCTS;
  }
  getProductList = () => {
    this.api.getProductList().subscribe(
      data => {
        // TODO: split the data into two parts
        this.products = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
