import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../_services/product.service';
import {ProductQuery} from '../../_models/ProductQuery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
  // providers: [ProductService]
})
export class ProductListComponent implements OnInit {

  Products: Array<object> = [];
  // productService: ProductService;


  constructor(private api: ProductService, private router: Router) {
    // this.productService = api;
    api.productsupdate.subscribe(data => {
      this.updateData(data);
    });

    // let mockdata: ProductQuery = new ProductQuery();
    // mockdata.ProductType = '';
    // mockdata.ProductCategory = '';
    // mockdata.ProductTags = '';
    // mockdata.brand = 'maybelline';
    // mockdata.PriceLessThan = 0;
    // mockdata.PriceGreaterThan = 0;
    // mockdata.RatingLessThan = 0;
    // mockdata.RatingGreaterThan = 0;
    //
    // api.getProductsInfo(mockdata);
  }


  ngOnInit(): void {
  }

  updateData(data: Array<object>): void {
    this.Products = data;
  }

  toDetail(id): void {
    var i;
    for (i = 0; i < this.Products.length; i++){
      if (this.Products[i]['id'] == id) {
        this.api.currentproduct = this.Products[i];
        console.log(id);
        console.log(this.api.currentproduct);
        break;
      }
    }
    this.router.navigate(['/product']);
  }

}
