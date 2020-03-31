import { firstNameValidators } from './validators/firstname.validator';
import { CheckoutService } from './../services/checkout.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [CheckoutService]
})
export class CheckoutComponent implements OnInit {

  form;

  constructor(private api:CheckoutService, fb: FormBuilder) { 
    this.form = fb.group({
      firstname: ['', Validators.required, firstNameValidators.lengthCheck],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
  }

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



  ngOnInit(): void {
  }

  placeOrderButtonClicked(){

  }

}
