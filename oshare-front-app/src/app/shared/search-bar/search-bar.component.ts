import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../_services/product.service';
import {ProductQuery} from '../../_models/ProductQuery';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  input = '';
  brand = '';
  query = new ProductQuery();
  constructor(private api: ProductService) { }

  ngOnInit(): void {
  }

  DoSearch(): void {
    console.log(this.brand);
    console.log(this.input);
    this.query.ProductTags = '';
    this.query.ProductType = '';
    this.query.brand = this.brand;
    this.query.ProductCategory = '';
    this.query.input = this.input;
    this.api.getProductsInfo(this.query);
  }

}
