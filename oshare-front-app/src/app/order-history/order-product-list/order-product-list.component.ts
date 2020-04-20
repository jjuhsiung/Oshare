import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/_models/order.model';
import {ProductService} from "../../_services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-product-list',
  templateUrl: './order-product-list.component.html',
  styleUrls: ['./order-product-list.component.css']
})
export class OrderProductListComponent implements OnInit {

  @Input() order: Order;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.order.productCounts);
  }

  toDetail(id): void {
    this.productService.ProductClick(id);
    this.router.navigate(['/product'], {
      queryParams: {
        'product_id': id,
      }
    });
  }
}
