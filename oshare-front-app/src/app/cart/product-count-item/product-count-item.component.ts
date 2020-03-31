import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-count-item',
  templateUrl: './product-count-item.component.html',
  styleUrls: ['./product-count-item.component.css']
})
export class ProductCountItemComponent implements OnInit {

  @Input() imgURL: String;
  @Input() productName: String;
  @Input() count: number = 0;
  @Input() color: String;
  @Input() price: number = 0;
  
  totalPrice: number;

  countChange(count: number){
    this.totalPrice = this.price * count;
  }
  
  constructor() {
  }

  ngOnInit(): void {
    this.totalPrice = this.price * this.count;
  }

  removeButtonClicked(){
  }

}
