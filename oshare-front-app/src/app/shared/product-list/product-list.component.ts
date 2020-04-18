import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../_services/product.service';
import {ProductQuery} from '../../_models/ProductQuery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Product} from '../../_models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  Products: Array<object> = [];
  pageNum = 1;
  pageSize = 12;
  MaxPageSize = 1;
  pagelist = [];
  productNum: number;
  // rating = 3;
  // productService: ProductService;


  constructor(private api: ProductService, private router: Router, private route: ActivatedRoute) {
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
    this.productNum = this.Products.length;
    // for(let product_data of data['response'])
    // {
    //   var product = new Product(product_data.name,product_data.rating, product_data.price, "", product_data.img_link, product_data.id);
    //   this.Products.push(product);
    // }
    console.log(this.Products);
    this.MaxPageSize = this.Products.length/this.pageSize + 1;
    this.pagelist = [];
    for (let i=0;i<this.MaxPageSize-1;i++)
      this.pagelist.push(i);
    console.log(this.pagelist);
  }

  toDetail(id): void {
    this.api.addClick(id);
    this.router.navigate(['/product'], {
      queryParams: {
        'product_id': id,
      }
    });
  }

  PrePage(): void {
    if (this.pageNum>1)
      this.pageNum = this.pageNum -1;
  }

  NextPage(): void {
    if (this.pageNum < this.MaxPageSize - 1)
      this.pageNum = this.pageNum + 1;
  }

  ToPage(num): void {
    this.pageNum = num;
  }

  SortbyPriceHtoL(): void {
    this.Products.sort((a,b)=> parseFloat(b['price'])-parseFloat(a['price']));
  }

  SortbyPriceLtoH(): void {
    this.Products.sort((a,b)=>parseFloat(a['price'])-parseFloat(b['price']));
  }

  SortbyRatingHtoL(): void {
    this.Products.sort((a,b)=>parseFloat(b['rating'])-parseFloat(a['rating']));
  }

  SortbyRatingLtoH(): void {
    this.Products.sort((a,b)=>parseFloat(a['rating'])-parseFloat(b['rating']));
  }

}
