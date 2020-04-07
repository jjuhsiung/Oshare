import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../_services/product.service';
import {ProductQuery} from '../../_models/ProductQuery';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  Products: Array<object> = [];



  constructor(private api: ProductService) {
    api.productsupdate.subscribe(data => {
      this.updateData(data);
    });

    let mockdata: ProductQuery = new ProductQuery();
    mockdata.ProductType = '';
    mockdata.ProductCategory = '';
    mockdata.ProductTags = '';
    mockdata.brand = '';
    mockdata.PriceLessThan = 0;
    mockdata.PriceGreaterThan = 0;
    mockdata.RatingLessThan = 0;
    mockdata.RatingGreaterThan = 0;

    api.getProductsInfo(mockdata);
  }


  ngOnInit(): void {
  }

  updateData(data: Array<object>): void {
    this.Products = data;
  }

}
