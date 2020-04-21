import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { ProductQuery } from '../../_models/ProductQuery';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  input = '';
  brand = '';
  price = '';
  ProductType = '';
  query = new ProductQuery();
  to_result = true;
  placeHolder = 'Search';
  brandlist: string[] = ['almay', 'alva', 'anna sui', 'annabelle', 'benefit', 'boosh',
'burt\'s bees', 'butter london', 'c\'est moi', 'cargo cosmetics', 'china glaze', 'clinique',
'coastal classic creation', 'colourpop', 'covergirl', 'dalish', 'deciem', 'dior', 'dr. hauschka',
'e.l.f.', 'essie', 'fenty', 'glossier', 'green people', 'iman', 'l\'oreal', 'lotus cosmetics usa', 'maia\'s mineral galaxy',
'marcelle', 'marienatie', 'maybelline', 'milani', 'mineral fusion', 'misa', 'mistura', 'moov',
'nudus', 'nyx', 'orly', 'pacifica', 'penny lane organics', 'physicians formula', 'piggy paint',
'pure anada', 'rejuva minerals', 'revlon', 'sally b\'s skin yummies', 'salon perfect', 'sante',
'sinful colours', 'smashbox', 'stila', 'suncoat', 'w3llpeople', 'wet n wild', 'zorah',
'zorah biocosmetiques'];
  constructor(private api: ProductService, private router: Router) {
    this.api.currentQuery.subscribe(query => {
      console.log(query);
      if(query.input!=null&&query.input!='')
      {
        this.placeHolder=query.input;
      }
    });
  }

  ngOnInit(): void {
    console.log(this.placeHolder);
    if (location.pathname != '/new-post') {
      this.to_result = true;
    } else {
      this.to_result = false;
    }

    console.log('current url');
    console.log(location.pathname);
  }

  DoSearch(): void {
    console.log(this.brand);
    console.log(this.input);
    this.query.ProductTags = '';
    this.query.ProductType = this.ProductType;
    this.query.brand = this.brand;
    this.query.ProductCategory = '';
    this.query.input = this.input;
    if (this.price !== '') {
      if (this.price === 'high') {
        this.query.PriceGreaterThan = 30;
        this.query.PriceLessThan = 0;
      } else if (this.price === 'medium') {
        this.query.PriceGreaterThan = 10;
        this.query.PriceLessThan = 30;
      } else if (this.price === 'low') {
        this.query.PriceLessThan = 10;
        this.query.PriceGreaterThan = 0;
      }
    }
    this.api.getProductsInfo(this.query);
    this.to_result = false;
    if (location.pathname != '/new-post') {
      this.to_result = true;
    }
    console.log('compare path name');
    console.log(this.to_result);
    console.log('current url is /search');
    this.router.navigate(['/search-result'], {queryParams: this.query});
  }
}
