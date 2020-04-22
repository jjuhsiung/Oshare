import { Component, OnInit } from '@angular/core';
import {ProductQuery} from '../../_models/ProductQuery';
import {Options} from 'ng5-slider';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../_services/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  input = '';
  brand = '';
  price = '';
  ProductType = '';
  query = new ProductQuery();
  originQuery = new ProductQuery();
  brandlist: Array<any> = [{name: 'almay', checked: false}, {name: 'alva', checked: false},
    {name: 'anna sui', checked: false}, {name: 'annabelle', checked: false}, {name: 'benefit', checked: false},
    {name: 'boosh', checked: false}, {name: 'burt\'s bees', checked: false}, {name: 'butter london', checked: false},
    {name: 'c\'est moi', checked: false}, {name: 'cargo cosmetics', checked: false},
    {name: 'china glaze', checked: false}, {name: 'clinique', checked: false},
    {name: 'coastal classic creation', checked: false}, {name: 'colourpop', checked: false},
    {name: 'covergirl', checked: false}, {name: 'dalish', checked: false},
    {name: 'deciem', checked: false}, {name: 'dior', checked: false}, {name: 'dr. hauschka', checked: false},
    {name: 'e.l.f.', checked: false}, {name: 'essie', checked: false}, {name: 'fenty', checked: false},
    {name: 'glossier', checked: false}, {name: 'green people', checked: false}, {name: 'iman', checked: false},
    {name: 'l\'oreal', checked: false}, {name: 'lotus cosmetics usa', checked: false},
    {name: 'maia\'s mineral galaxy', checked: false}, {name: 'marcelle', checked: false},
    {name: 'marienatie', checked: false}, {name: 'maybelline', checked: false},
    {name: 'milani', checked: false}, {name: 'mineral fusion', checked: false},
    {name: 'misa', checked: false}, {name: 'mistura', checked: false}, {name: 'moov', checked: false},
    {name: 'nudus', checked: false}, {name: 'nyx', checked: false}, {name: 'orly', checked: false},
    {name: 'pacifica', checked: false}, {name: 'penny lane organics', checked: false},
    {name: 'physicians formula', checked: false}, {name: 'piggy paint', checked: false},
    {name: 'pure anada', checked: false}, {name: 'rejuva minerals', checked: false},
    {name: 'revlon', checked: false}, {name: 'sally b\'s skin yummies', checked: false},
    {name: 'salon perfect', checked: false}, {name: 'sante', checked: false},
    {name: 'sinful colours', checked: false}, {name: 'smashbox', checked: false},
    {name: 'stila', checked: false}, {name: 'suncoat', checked: false},
    {name: 'w3llpeople', checked: false}, {name: 'wet n wild', checked: false},
    {name: 'zorah', checked: false}, {name: 'zorah biocosmetiques', checked: false},
  ];
  typeList: Array<object> = [{name: 'Blush', value: 'blush', category: ['Powder', 'Cream']},
    {name: 'Bronzer', value: 'bronzer', category: ['Powder']},
    {name: 'Eyebrow', value: 'eyebrow', category: ['Pencil']},
    {name: 'Eyeliner', value: 'eyeliner', category: ['Liquid', 'Pencil', 'Gel', 'Cream']},
    {name: 'Eyeshadow', value: 'eyeshadow', category: ['Palette', 'Pencil', 'Cream']}, // TODO: blank field
    {name: 'Foundation', value: 'foundation', category: ['Liquid', 'Contour', 'Bb cc', 'Concealer', 'Cream', 'Mineral', 'Powder', 'Highlighter']},
    {name: 'Lip liner', value: 'lip_liner', category: ['Pencil']},
    {name: 'Lipstick', value: 'lipstick', category: ['Lipstick', 'Lip gloss', 'Liquid', 'Lip stain']},
    {name: 'Mascara', value: 'mascara', category: null},
    {name: 'Nail polish', value: 'nail_polish', category: null}];
  // brandMap = new Map();


  lowValue = 0;
  highValue = 80;
  options2: Options = {
    floor: 0,
    ceil: 80,
    step: 1,
    showTicks: false,
    animate: false,
  };
  checkedArray: Array<string>;
  resetBrand: boolean;
  resetType: boolean;
  selectedType: string;
  brandSet = new Set();

  constructor(private fb: FormBuilder, private api: ProductService, private router: Router, private route: ActivatedRoute) {
    // for(let brand of this.brandlist)
    // {
    //   this.brandMap.set(brand.name,false);
    // }
    this.api.currentQuery.subscribe(query => {
      console.log(query);
      this.originQuery=query;
      this.ngOnInit();
    });
  }
  checkExist(brand,brandlist): boolean{
    for(let item of brandlist)
    {
      if(brand==item)
        return true;
    }
    return false;
  }

  ngOnInit(): void {
    const checkBrandExistence = brandParam => this.brandlist.some( ({brand}) => name == brandParam)
    console.log('on init');
    let query = this.originQuery;
    this.query = this.originQuery;

    this.selectedType = '';
    if(query.ProductType!="")
    {
      this.selectedType = query.ProductType;
      // this.selectedType=query.ProductType.split("_").join(" ");
      this.resetType=false;
    }
    else{
      this.resetType=true;
    }
    this.checkedArray=[];
    if(query.brand!="")
    {
      let currentBrand=query.brand.split(",");
      console.log(currentBrand);
      for(let brand of this.brandlist)
      {
        if(this.checkExist(brand.name,currentBrand))
        {
          brand.checked=true;
          this.checkedArray.push(brand.name);
        }
        else
        {
          brand.checked=false;
        }
      }
      this.resetBrand=false;
    }
    else
    {
      for(let brand of this.brandlist)
      {
        brand.checked=false;
      }
      this.resetBrand=true;
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSelect(type): void {
    this.selectedType = type;
  }

  DoSearch(): void {
    this.query.input = this.originQuery.input;
    this.query.ProductCategory = this.originQuery.ProductCategory;
    this.query.ProductTags = '';
    this.checkedArray = [];
    for(let brand of this.brandlist)
    {
      if(brand.checked==true)
      {
        this.checkedArray.push(brand.name);
      }
    }
    console.log(this.checkedArray.toString());
    if(this.checkedArray.length>0|| this.resetBrand) {
      this.query.brand = this.checkedArray.toString();
    }
    else
    {
      this.query.brand = this.originQuery.brand;
    }

    this.query.PriceGreaterThan = this.lowValue;
    this.query.PriceLessThan = this.highValue;
    if (this.selectedType!=""||this.resetType) {
      this.query.ProductType = this.selectedType;
    }
    else
    {
      this.query.ProductType = this.originQuery.ProductType;
    }
    console.log(this.query);
    this.api.getProductsInfo(this.query);
    this.router.navigate(['/search-result'], {queryParams: this.query});
  }

  ResetFilter() {
    this.lowValue = 0;
    this.highValue = 80;
    for (let i = 0; i < this.brandlist.length; i++) {
      this.brandlist[i].checked = false;
    }
    this.selectedType="";
    this.resetType = true;
    this.resetBrand = true;
    this.DoSearch();
  }
}
