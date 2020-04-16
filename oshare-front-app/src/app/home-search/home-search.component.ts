import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import {Product} from "../_models/product.model";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ProductCount} from "../_models/product-count.model";

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css']
})
export class HomeSearchComponent implements OnInit {
  popularProducts = [];

  constructor(private productService: ProductService,private router: Router) {
    var i:number;
    var url:string='http://127.0.0.1:8000/products/';
    for(i=1;i<=3;i++)
    {
      // TODO: get popular products by click numbers
      // TODO: the order can not be guaranteed
      var temp=url.concat(i.toString());
      this.productService.getProductByURL(temp).subscribe(
        product_data => {
          console.log(product_data);
          this.popularProducts.push(product_data);
        }, error =>{
          console.log(error);
        }
      )
    }
    console.log(this.popularProducts);
  }

  ngOnInit(): void {
  }

  toDetail(id): void {
    console.log(id);
    // this.productService.currentproduct = id;
    this.router.navigate(['/product'], {
      queryParams: {
        'product_id': id,
      }
    });
  }
}
