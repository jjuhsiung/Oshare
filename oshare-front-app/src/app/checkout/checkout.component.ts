import { UserService } from 'src/app/_services/user.service';
import { firstNameValidators } from './validators/firstname.validator';
import { CheckoutService } from '../_services/checkout.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [CheckoutService]
})
export class CheckoutComponent implements OnInit {

  form;

  constructor(private checkOutService: CheckoutService,
    private userService: UserService,
    private router: Router,
    fb: FormBuilder) { 
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
    var cartId: number=0;

    this.userService.getUserObjectById(localStorage.getItem('userId')).subscribe(
      response=>{
        cartId = response.cart.id;
        console.log(response);

        var checkoutData = {
          'userId' : localStorage.getItem('userId'),
          'cartId' : cartId,
          'first_name' : this.firstname.value,
          'last_name' : this.lastname.value,
          'phone' : this.phone.value,
          'address' : this.address.value
        }

        this.checkOutService.checkOut(checkoutData).subscribe(
          checkoutResponse=>{
            //console.log(checkoutResponse);
            alert('Order successfully created!');
            this.router.navigate(['/search']);
          }, error => {
            console.log(error);
          }

          );

      },
      error => {
        console.log(error);
      }
    );




  }

}
