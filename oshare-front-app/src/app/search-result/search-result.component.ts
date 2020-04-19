import { Component, OnInit } from '@angular/core';
import {ProductService} from '../_services/product.service';
import {ProductQuery} from '../_models/ProductQuery';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {FormGroup, FormBuilder, FormArray, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  input = '';
  brand = '';
  price = '';
  ProductType = '';
  query = new ProductQuery();

  constructor(private fb: FormBuilder, private api: ProductService,private router: Router,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const map = this.route.parent.snapshot.queryParamMap;
    let query = new ProductQuery();
    for (let x of map.keys)
    {
      query[x] = map.get(x);
    }
    console.log(query);
    this.api.getProductsInfo(query);
  }
}
