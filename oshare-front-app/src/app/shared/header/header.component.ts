import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ProductQuery} from '../../_models/ProductQuery';
import {ProductService} from '../../_services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  firstname = '';
  lastname = '';
  showModal: boolean;
  query = new ProductQuery();

  // login
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  message: any = '';

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder, private productService: ProductService) { }
  // typeList: string[] = ['Blush', 'Bronzer', 'Eyebrow', 'Eyeliner'];
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
  brandlist: string[] = ['almay', 'alva', 'anna sui', 'annabelle', 'benefit', 'boosh',
    'burt\'s bees', 'butter london', 'c\'est moi', 'cargo cosmetics', 'china glaze', 'clinique',
    'coastal classic creation', 'colourpop', 'covergirl', 'dalish', 'deciem', 'dior', 'dr. hauschka',
    'e.l.f.', 'essie', 'fenty', 'glossier', 'green people', 'iman', 'l\'oreal', 'lotus cosmetics usa', 'maia\'s mineral galaxy',
    'marcelle', 'marienatie', 'maybelline', 'milani', 'mineral fusion', 'misa', 'mistura', 'moov',
    'nudus', 'nyx', 'orly', 'pacifica', 'penny lane organics', 'physicians formula', 'piggy paint',
    'pure anada', 'rejuva minerals', 'revlon', 'sally b\'s skin yummies', 'salon perfect', 'sante',
    'sinful colours', 'smashbox', 'stila', 'suncoat', 'w3llpeople', 'wet n wild', 'zorah',
    'zorah biocosmetiques'];

   persons = [
        {name: 'John',
            age: '35'},
        {name: 'Peter',
            age: '14'},
        {name: 'Amanda',
            age: '23'},
        {name: 'Joseph',
            age: '17'},
        {name: 'Juliet',
            age: '2'}
    ];

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.checkLoginStatus()) {
      this.userService.getUserObjectById(localStorage.getItem('userId')).subscribe(
        data => {
          this.firstname = data.first_name;
          this.lastname = data.last_name;
        }, error => {
          console.log(error);
        }
      );
    }
  }

  public chunk(arr, size) {
    const newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  }

  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');

    if (this.router.url === '/cart' || this.router.url === '/new-post') {
      alert('Required login!');
      this.router.navigate(['/search']);
    } else {
      location.reload();
    }
  }

  get f() { return this.loginForm.controls; }

  checkLoginStatus() {
    return localStorage.getItem('userToken') != null;
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }
  onLogin() {
    const formObj = this.loginForm.getRawValue();
    if (this.loginForm.invalid) {
      this.message = 'Username or Password required!';
      this.loginForm.reset();
      return;
    }
    this.userService.loginUser(formObj).subscribe(
      response => {
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userId', response.id);
        alert('Logged in successfully!');
        window.location.reload();
      },
      error => {
        console.log(error);
        this.message = 'Wrong username or password!';
        this.loginForm.reset();
      }
    );
  }

   DoSearchType(type): void {
    this.query = new ProductQuery();
    this.query.ProductTags = '';
    this.query.brand = '';
    this.query.ProductType = type.value;
    console.log(type.value);
    console.log(this.query);
    this.query.ProductCategory = '';
    this.query.input = '';
    this.productService.getProductsInfo(this.query);
    this.router.navigate(['/search-result'], {queryParams: this.query});
  }
  DoSearchCategory(type, category): void {
    this.query = new ProductQuery();
    this.query.ProductTags = '';
    this.query.brand = '';
    this.query.ProductType = type.value;
    console.log(type.value);
    console.log(category);
    this.query.ProductCategory = category.toLowerCase();
    this.query.input = '';
    console.log(this.query);
    this.productService.getProductsInfo(this.query);
    this.router.navigate(['/search-result'], {queryParams: this.query});
  }
  DoSearchBrand(brand): void {
    this.query = new ProductQuery();
    this.query.ProductTags = '';
    this.query.brand = brand;
    this.query.ProductType = '';
    // console.log(type.value);
    // console.log(category);
    this.query.ProductCategory = '';
    this.query.input = '';
    console.log(this.query);
    this.productService.getProductsInfo(this.query);
    this.router.navigate(['/search-result'], {queryParams: this.query});
  }
}









