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
  to_result = true;
  brandlist: string[] = ['almay', 'alva', 'anna sui', 'annabelle', 'benefit', 'boosh',
    'burt\'s bees', 'butter london', 'c\'est moi', 'cargo cosmetics', 'china glaze', 'clinique',
    'coastal classic creation', 'colourpop', 'covergirl', 'dalish', 'deciem', 'dior', 'dr. hauschka',
    'e.l.f.', 'essie', 'fenty', 'glossier', 'green people', 'iman', 'l\'oreal', 'lotus cosmetics usa', 'maia\'s mineral galaxy',
    'marcelle', 'marienatie', 'maybelline', 'milani', 'mineral fusion', 'misa', 'mistura', 'moov',
    'nudus', 'nyx', 'orly', 'pacifica', 'penny lane organics', 'physicians formula', 'piggy paint',
    'pure anada', 'rejuva minerals', 'revlon', 'sally b\'s skin yummies', 'salon perfect', 'sante',
    'sinful colours', 'smashbox', 'stila', 'suncoat', 'w3llpeople', 'wet n wild', 'zorah',
    'zorah biocosmetiques'];

  lowValue: number = 0;
  highValue: number = 80;
  options2: Options = {
    floor: 0,
    ceil: 80,
    step: 1,
    showTicks: false,
    animate: false,
  };
  // value;
  // maps the local data column to fields property
  public localFields: Object = { text: 'Name'};
  Data: Array<any> = [
    { name:'almay',value:'almay'},
    { name: 'alva',value: 'alva'},
    { name: 'anna sui',value: 'anna sui'},
    { name: 'annabelle',value: 'annabelle'},
    { name: 'benefit', value: 'benefit'},
    { name: 'boosh',value: 'boosh'},
    { name: 'burt\'s bees',value: 'burt\'s bees'},
    { name: 'butter london',value: 'burt\'s bees'},
  ];
  form: FormGroup;
  onCheckboxChange(e)
  {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  constructor(private fb: FormBuilder,private api: ProductService,private router: Router,private route: ActivatedRoute) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    });
    console.log(this.form);
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

  onSubmit(form)
  {
    // console.log(this.value.toString());
    // console.log(this.dropdownList);
  }

  // selectedBrand()
  // {
  //   console.log(this.value.toString());
  //   // console.log(this.dropdownList);
  // }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  submitForm() {
    console.log(this.form.value['checkArray']);
    // console.log(this.form['checkArray']);
    const map = this.route.parent.snapshot.queryParamMap;
    let query = new ProductQuery();
    for (let x of map.keys)
    {
      query[x] = map.get(x);
    }
    console.log(query);
    this.query=query;
    this.DoSearch();
  }

  DoSearch(): void {
    const map = this.route.parent.snapshot.queryParamMap;
    let query = new ProductQuery();
    for (let x of map.keys)
    {
      query[x] = map.get(x);
    }
    console.log(query);
    this.query=query;
    // this.query = new ProductQuery();
    console.log(this.brand);
    console.log(this.form.value.toString());
    this.query.brand=this.form.value['checkArray'].toString();
    this.form.reset();
    this.query.PriceGreaterThan=this.lowValue;
    this.query.PriceLessThan=this.highValue;
    // if (this.price !== '') {
    //   if (this.price === 'high') {
    //     this.query.PriceGreaterThan = 30;
    //     this.query.PriceLessThan = 0;
    //   } else if (this.price === 'medium') {
    //     this.query.PriceGreaterThan = 10;
    //     this.query.PriceLessThan = 30;
    //   } else if (this.price === 'low') {
    //     this.query.PriceLessThan = 10;
    //     this.query.PriceGreaterThan = 0;
    //   }
    // }
    console.log(this.query);
    this.api.getProductsInfo(this.query);
    // this.form.value['checkArray']=[];

    this.to_result = false;
    if (location.pathname != '/new-post') {
      this.to_result = true;
    }
    console.log('compare path name');
    console.log(this.to_result);
    if (this.to_result) {
      console.log('current url is /search');
      this.router.navigate(['/search-result'], {queryParams: this.query});
    } else if (location.pathname == '/new-post') {
      console.log('current url is /new-post');
    }
  }
}
