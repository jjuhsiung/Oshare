import { CartService } from '../../_services/cart.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../_services/product.service";

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
  @Input() price: number = 0;
  @Input() productCountId: number;
  @Output() productUpdate = new EventEmitter();
  @Output() productDelete = new EventEmitter();
  
  totalPrice: number;

  product = {
    productCountId : this.productCountId,
    imgURL : this.imgURL,
    productName : this.productName,
    count : this.count,
    price : this.price,
    index : this.index,
  };

  constructor(private CartService: CartService,private router:Router,private productService: ProductService) {
  }

  countChange = (count: number) => {
    this.totalPrice = this.price * count;
    this.count = count;
    this.productUpdate.emit({'id': this.productCountId, 'count':count});
  }
  
  ngOnInit(): void {
    this.totalPrice = this.price * this.count;
    console.log("this.index");
    console.log(this.index);
    console.log(this.imgURL);
  }

  removeButtonClicked(){
    this.productDelete.emit();
  }

  toDetail(id): void {
    this.productService.addClick(id);
    this.router.navigate(['/product'], {
      queryParams: {
        'product_id': id,
      }
    });
  }
}
