import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/_models/order.model';

@Component({
  selector: 'app-order-product-list',
  templateUrl: './order-product-list.component.html',
  styleUrls: ['./order-product-list.component.css']
})
export class OrderProductListComponent implements OnInit {

  @Input() order: Order;
  constructor() { }

  ngOnInit(): void {
  }

}
