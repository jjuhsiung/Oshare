import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { ProductCountService } from 'src/app/_services/product-count.service';
import { Product } from 'src/app/_models/product.model';
import { ProductCount } from 'src/app/_models/product-count.model';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  styleUrls: ['./cart-dropdown.component.scss']
})
export class CartDropdownComponent implements OnInit {

  cart = {
    products: [],
    subtotal: 0,
  }

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private router: Router) {
    this.userService.getUserObjectById(localStorage.getItem('userId')).subscribe(
      Response => {
        for (let i = 0; i < Response.cart.productCounts.length; i++) {
          this.productService.getProductByURL(Response.cart.productCounts[i].product).subscribe(
            product_data => {
              var product = new Product(product_data.name, "", product_data.price, "", product_data.img_link, "", product_data.id);
              var productCount = new ProductCount(product, Response.cart.productCounts[i].count, Response.cart.productCounts[i].id);
              this.cart.products.push(productCount);
              this.cart.subtotal += productCount.count * product.Price;
            }, error => {
              console.log(error);
            }
          )
        }
        //console.log(this.cart.products);
      }, error => {
        console.log(error);
      }
    )

  }
  toDetail(id): void {
    this.productService.ProductClick(id);
    this.router.navigate(['/product'], {
      queryParams: {
        'product_id': id,
      }

    });
  }
  ngOnInit(): void {
  }

}
