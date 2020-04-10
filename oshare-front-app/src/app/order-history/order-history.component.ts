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
  data;

  constructor(private userService: UserService, private productService: ProductService) { 
    this.userService.getUserObjectById(localStorage.getItem('userId')).subscribe(
      response => {
        for(var i=0; i<response.order.length; i++){
          var order_json = response.order[i];
          var order = new Order(order_json.first_name, 
            order_json.last_name, 
            order_json.phone, 
            order_json.address, 
            order_json.order_time, [] as ProductCount[]);
            this.orders.push(order);
            console.log(order);

          for(var j=0; j<order_json.productCounts.length; j++){
            var product_json = order_json.productCounts[j];
            var product = new Product();
            var productCount = new ProductCount(product, product_json.count, product_json.id);
            order.productCounts.push(productCount);

            this.productService.getProductByURL(product_json.product).subscribe(
              product_data=>{
                //console.log(product_data);
                product.title = product_data.name;
                product.Price = product_data.price;
                product.ProductImage = product_data.img_link;
                console.log(product);
            }, error =>{
                console.log(error);
            });
            console.log(product);

          }
        }
        //console.log(this.orders);
      }, error => {
        console.log(error);
      }
    );
    
  }

  ngOnInit(): void {
  }

}
