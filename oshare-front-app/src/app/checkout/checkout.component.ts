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

}
