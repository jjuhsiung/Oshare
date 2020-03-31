import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-count-item',
  templateUrl: './product-count-item.component.html',
  styleUrls: ['./product-count-item.component.css']
})
export class ProductCountItemComponent implements OnInit {

  @Input() imgURL: String;
  @Input() productName: String;
  @Input() count: number;
  @Input() color: String;
  @Input() price: number;
  @Input() totalPrice: number;
  
  
  constructor() { }

  ngOnInit(): void {
  }

  removeButtonClicked(){

  }

}
