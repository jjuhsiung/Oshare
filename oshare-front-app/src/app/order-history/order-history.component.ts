import { Router } from '@angular/router';
import { ProductService } from './../_services/product.service';
import { ProductCount } from './../_models/product-count.model';
import { Order } from './../_models/order.model';
import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../_models/product.model';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders = []

  constructor(private userService: UserService, private productService: ProductService, private router: Router) {
    this.userService.getCurrentUser().subscribe(
      response => {
        for (var i = 0; i < response.order.length; i++) {
          var order_json = response.order[i];
          var order = new Order(order_json.first_name,
            order_json.last_name,
            order_json.phone,
            order_json.address,
            order_json.order_time, [] as ProductCount[], 0);
          this.orders.push(order);
          var productCounts = order_json.productCounts;
          var total = 0;
          for (var j = 0; j < productCounts.length; j++) {
            total += productCounts[j].product.price * productCounts[j].count;
            console.log(productCounts[j].product);
            var product = new Product(productCounts[j].product.name,
              "", productCounts[j].product.price, "", productCounts[j].product.img_link, "", productCounts[j].product.id);
            var productCount = new ProductCount(product, productCounts[j].count, productCounts[j].id);
            order.productCounts.push(productCount);
          }
          order.total = total;
        }
      }, error => {
      }
    );

  }

  ngOnInit(): void {
  }


}
