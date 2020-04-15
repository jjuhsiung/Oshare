import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import {Product} from "../_models/product.model";
import {ProductCount} from "../_models/product-count.model";

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css']
})
export class HomeSearchComponent implements OnInit {
  popularProducts = [];

  constructor(private productService: ProductService) {
    var i:number;
    var url:string='http://127.0.0.1:8000/products/';
    for(i=1;i<=3;i++)
    {
      // TODO: get popular products by click numbers
      var temp=url.concat(i.toString());
      this.productService.getProductByURL(temp).subscribe(
        product_data=> {
          var product = new Product(product_data.name,"", product_data.price, "", product_data.img_link);
          this.popularProducts.push(product);
        }, error =>{
          console.log(error);
        }
      )
    }
    console.log(this.popularProducts);
  }

  ngOnInit(): void {
  }

}
