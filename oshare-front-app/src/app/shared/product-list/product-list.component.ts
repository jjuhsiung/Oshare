import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../_services/product.service';
import {ProductQuery} from '../../_models/ProductQuery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  Products: Array<object> = [];
  // productService: ProductService;


  constructor(private api: ProductService, private router: Router, private  route: ActivatedRoute) {
    // this.productService = api;
    this.api.productsupdate.subscribe(data => {
      this.updateData(data);
    });

  }


  ngOnInit(): void {
    const map = this.route.parent.snapshot.queryParamMap;
    let query = new ProductQuery();
    for (let x of map.keys)
    {
      query[x] = map.get(x);
    }
    console.log('line 34 in product-list.ts');
    this.api.getProductsInfo(query);
  }


  updateData(data: object): void {
    this.Products = data['response'];
  }

  toDetail(id): void {
    this.api.currentproduct = id;
    this.router.navigate(['/product']);
  }

}
