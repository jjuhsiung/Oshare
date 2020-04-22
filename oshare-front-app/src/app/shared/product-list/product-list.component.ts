import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../_services/product.service';
import {ProductQuery} from '../../_models/ProductQuery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Product} from "../../_models/product.model";

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
  default = 'https://bookingmoments.com/upload-nct/img-default.gif';


  constructor(private api: ProductService, private router: Router, private  route: ActivatedRoute) {
    console.log(this.api.pageNum);
    this.api.productsupdate.subscribe(data => {
      this.pageNum = this.api.pageNum;
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
    console.log(this.Products);
    this.MaxPageSize = this.Products.length/this.pageSize + 1;
    this.pagelist = [];
    for (let i=0;i<this.MaxPageSize-1;i++)
      this.pagelist.push(i);
    console.log(this.pagelist);
  }

  toDetail(id): void {
    // this.api.currentproduct = id;
    this.api.ProductClick(id);
    this.router.navigate(['/product'], {
      queryParams: {
        'product_id': id,
      }
    });
  }

  PrePage(): void {
    if (this.pageNum>1)
    {
      this.pageNum = this.pageNum -1;
      this.api.pageNum = this.pageNum;
    }
  }

  NextPage(): void {
    if (this.pageNum < this.MaxPageSize - 1)
    {
      this.pageNum = this.pageNum + 1;
      this.api.pageNum = this.pageNum;
    }
  }

  ToPage(num): void {
    this.pageNum = num;
    this.api.pageNum = this.pageNum;
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

  SortbyBrandName(): void {
    this.Products.sort((a,b)=>{
      if (a['brand']==null)
        return 1;
      if (b['brand']==null)
        return -1;
      return a['brand'].localeCompare(b['brand'])
    });
  }

  SortbySelling(): void {
    this.Products.sort((a,b)=>parseInt(b['bought_num'])-parseFloat(a['bought_num']));
  }

  showPage(i): boolean {
    if ((i <= this.pageNum && this.pageNum - i < 5) || (i > this.pageNum && i - this.pageNum < 5))
      return true;
    return false;
  }

  imageExists(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function() { callback=true;};
    img.onerror = function() { callback=false; };
  }

  checkImage(imageUrl, exists: boolean) {
    exists=true;
    console.log('RESULT: url=' + imageUrl + ', exists=' + exists);
  }

  updateUrl(src) {
    src = this.default;
  }
}
