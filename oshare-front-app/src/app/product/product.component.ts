import {Component, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {PRODUCTS} from '../MockProduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {}



}
