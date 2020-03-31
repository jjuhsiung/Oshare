import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-count-list',
  templateUrl: './product-count-list.component.html',
  styleUrls: ['./product-count-list.component.css']
})
export class ProductCountListComponent implements OnInit {

  @Input() products: Array<object>;

  constructor() { }

  ngOnInit(): void {
  }

}
