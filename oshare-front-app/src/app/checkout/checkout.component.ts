import { firstNameValidators } from './validators/firstname.validator';
import { CheckoutService } from './../services/checkout.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [CheckoutService]
})
export class CheckoutComponent implements OnInit {

  form = new FormGroup({
    firstname: new FormControl('', 
      Validators.required, 
      firstNameValidators.lengthCheck),
    lastname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required)
  });

  get firstname(){
    return this.form.get('firstname');
  }

  get lastname(){
    return this.form.get('lastname');
  }

  get phone(){
    return this.form.get('phone');
  }

  get address(){
    return this.form.get('address');
  }

  get city(){
    return this.form.get('city');
  }

  get state(){
    return this.form.get('state');
  }

  get zipcode(){
    return this.form.get('zipcode');
  }

  checkout(){
    console.log(this.form.value);
  }

  constructor(private api:CheckoutService) { 

  }

  ngOnInit(): void {
  }

  placeOrderButtonClicked(){

  }

}
