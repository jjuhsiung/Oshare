import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  shipping_info = {
    first_name: '',
    last_name: '',
    phone: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: ''
  }

  constructor() { 

  }

  ngOnInit(): void {
  }

  placeOrderButtonClicked(){
    console.log("first name: " + this.shipping_info.first_name);
    console.log("last name: " + this.shipping_info.last_name);
    console.log("phone: " + this.shipping_info.phone);
    console.log("street address: " + this.shipping_info.street_address);
    console.log("city: " + this.shipping_info.city);
  }

}
