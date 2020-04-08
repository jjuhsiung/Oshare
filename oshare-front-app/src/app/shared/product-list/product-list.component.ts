import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../_services/product.service';
import {ProductQuery} from '../../_models/ProductQuery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  Products: Array<object> = [];
  // productService: ProductService;


  constructor(private api: ProductService, private router: Router) {
    // this.productService = api;
    api.productsupdate.subscribe(data => {
      this.updateData(data);
    });

  }


  ngOnInit(): void {
  }

  updateData(data: object): void {
    this.Products = data['response'];
  }

  toDetail(id): void {
    this.api.currentproduct = id;
    this.router.navigate(['/product']);
  }

}
