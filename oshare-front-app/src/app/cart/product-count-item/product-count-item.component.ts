import { CartService } from './../../services/cart.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-count-item',
  templateUrl: './product-count-item.component.html',
  styleUrls: ['./product-count-item.component.css']
})
export class ProductCountItemComponent implements OnInit {

  @Input() index: number;
  @Input() imgURL: string;
  @Input() productName: string;
  @Input() count: number = 0;
  @Input() color: string;
  @Input() price: number = 0;
  @Output() productUpdate = new EventEmitter();
  @Output() productDelete = new EventEmitter();
  
  totalPrice: number;

  product = {
    imgURL : this.imgURL,
    productName : this.productName,
    count : this.count,
    color : this.color,
    price : this.price
  };

  constructor(private CartService: CartService) {
  }

  countChange = (count: number) => {
    this.totalPrice = this.price * count;
    this.count = count;
    this.productUpdate.emit(count);
  }
  
  ngOnInit(): void {
    this.totalPrice = this.price * this.count;
  }

  removeButtonClicked(){
    this.productDelete.emit();
  }

}
