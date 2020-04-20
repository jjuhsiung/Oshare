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
    {name: 'Lip liner', value: 'lip liner', category: ['Pencil']},
    {name: 'Lipstick', value: 'lipstick', category: ['Lipstick', 'Lip gloss', 'Liquid', 'Lip stain']},
    {name: 'Mascara', value: 'mascara', category: null},
    {name: 'Nail polish', value: 'nail polish', category: null}];

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
  showBrand: boolean;
  showType: boolean;
  selectedType: string;

  // form: FormGroup;
  // onCheckboxChange(e) {
  //   for (let i = 0; i < this.brandlist.length; i++) {
  //     console.log(this.brandlist[i].checked);
  //     this.brandlist[i].checked = false;
  //     console.log(this.brandlist[i].checked);
  //   }
  //   const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  //   console.log(e.target);
  //   if (e.target.checked) {
  //     checkArray.push(new FormControl(e.target.value));
  //     console.log(checkArray.controls);
  //     // checkArray.controls.reset();
  //   } else {
  //     let i = 0;
  //     checkArray.controls.forEach((item: FormControl) => {
  //       if (item.value == e.target.value) {
  //         checkArray.removeAt(i);
  //         return;
  //       }
  //       i++;
  //     });
  //   }
  // }
  constructor(private fb: FormBuilder, private api: ProductService, private router: Router, private route: ActivatedRoute) {
    // this.form = this.fb.group({
    //   checkArray: this.fb.array([])
    // });
    // console.log(this.form);
  }

  ngOnInit(): void {
    console.log('on init');
    const map = this.route.parent.snapshot.queryParamMap;
    const query = new ProductQuery();
    for (const x of map.keys) {
      query[x] = map.get(x);
    }
    console.log(query);
    this.query = query;

    this.selectedType = '';
    if(query.ProductType!="")
    {
      this.showType=false;
    }
    else{
      this.showType=true;
    }
    // this.showType=true;
    if(query.brand!="")
    {
      this.showBrand=false;
    }
    else
    {
      this.showBrand=true;
    }
    this.api.getProductsInfo(query);
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
    // if(this.showBrand)
    // {
    this.checkedArray = [];
    for(let brand of this.brandlist)
    {
      if(brand.checked==true)
      {
        this.checkedArray.push(brand.name);
      }
    }
    console.log(this.checkedArray.toString());
    if(this.checkedArray.length>0) {
      this.query.brand = this.checkedArray.toString();
    }

    // }

    // this.query.brand = this.form.value.checkArray.toString();
    // this.form.reset();
    this.query.PriceGreaterThan = this.lowValue;
    this.query.PriceLessThan = this.highValue;
    // if(this.showType)
    // {
    if (this.selectedType!="") {
      this.query.ProductType = this.selectedType;
    }
    // }
    console.log(this.query);
    this.api.getProductsInfo(this.query);
    // this.form.value['checkArray']=[];
    this.router.navigate(['/search-result'], {queryParams: this.query});
  }

  ResetFilter() {
    // console.log("reset filter");
    // this.form.reset();
    this.lowValue = 0;
    this.highValue = 80;
    for (let i = 0; i < this.brandlist.length; i++) {
      this.brandlist[i].checked = false;
    }
    this.selectedType="";
    this.ngOnInit();
  }
}
