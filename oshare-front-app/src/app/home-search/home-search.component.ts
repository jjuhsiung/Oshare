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

  constructor(private productService: ProductService,private router: Router) { }

  ngOnInit(): void {
    let user_id = 0;
    if (localStorage.getItem('userId')!=null)
    {
      user_id = parseInt(localStorage.getItem('userId'));
    }
    this.productService.getPoplarProduct(user_id).subscribe(
      product_data => {
        // console.log(product_data);
        this.popularProducts = product_data;
      }, error =>{
        console.log(error);
      }
    )
  }

  toDetail(id): void {
    console.log(id);
    // this.productService.currentproduct = id;
    this.productService.ProductClick(id);
    this.router.navigate(['/product'], {
      queryParams: {
        'product_id': id,
      }
    });
  }

}
