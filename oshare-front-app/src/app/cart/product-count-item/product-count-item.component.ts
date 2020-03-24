import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-count-item',
  templateUrl: './product-count-item.component.html',
  styleUrls: ['./product-count-item.component.css']
})
export class ProductCountItemComponent implements OnInit {

  product = [];

  constructor() { }

  ngOnInit(): void {
  }

}
