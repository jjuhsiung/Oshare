import { ProfileService } from 'src/app/_services/profile.service';
import { ProductService } from './../_services/product.service';
import { UserService } from 'src/app/_services/user.service';
import { firstNameValidators } from './validators/firstname.validator';
import { CheckoutService } from '../_services/checkout.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
/// <reference types="@types/googlemaps" />
import PlaceResult = google.maps.places.PlaceResult;

declare var paypal;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [CheckoutService]
})
export class CheckoutComponent implements OnInit {

  form;
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  public selectedAddress: PlaceResult;
  productSummary: string = "";
  totalPrice: number = 0;
  paidFor: boolean = false;

  accountFormValue = {
    firstname: "",
    lastname: "",
    phone: "",
    address: ""
  }

  constructor(private checkOutService: CheckoutService,
    private userService: UserService,
    private productService: ProductService,
    private profileService: ProfileService,
    private router: Router,
    fb: FormBuilder) {

    if (localStorage.getItem('userToken') == null) {
      alert('Required login.');
      this.router.navigate(['/search']);
    }

    this.form = fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(30)]],
      lastname: ['', [Validators.required, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      address: ['', [Validators.required, Validators.maxLength(100)]]
    });

    this.userService.getCurrentUser().subscribe(
      Response => {
        this.accountFormValue.firstname = Response.first_name;
        this.accountFormValue.lastname = Response.last_name;
        this.profileService.getProfileByURL(Response.profile.url).subscribe(
          profileData => {
            this.accountFormValue.phone = profileData.phone;
            this.accountFormValue.address = profileData.address;
          }, error => {
            console.log(error);
          }
        );
        for(let i = 0; i < Response.cart.productCounts.length; i++){
          this.productService.getProductByURL(Response.cart.productCounts[i].product).subscribe(
            product_data => {
              this.totalPrice += product_data.price * Response.cart.productCounts[i].count;
              this.productSummary += product_data.name + " x" + Response.cart.productCounts[i].count + ", ";
            }, error => {
              console.log(error);
            }
          )


        }
        console.log(this.productSummary);
        console.log(this.totalPrice);

    }, error => {
    console.log(error);
  })
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

checkout(){
  console.log(this.form.value);
}

checkCheckBoxvalue(event){
  if (event.checked) {
    this.form.controls['firstname'].setValue(this.accountFormValue.firstname);
    this.form.controls['lastname'].setValue(this.accountFormValue.lastname);
    this.form.controls['phone'].setValue(this.accountFormValue.phone);
    this.form.controls['address'].setValue(this.accountFormValue.address);
  } else {
    this.form.reset();
  }

}

ngOnInit(): void {
  paypal
    .Buttons({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.totalPrice.toFixed(2),
            }
          }
        ]
      });
    },
    onApprove: async (data, actions) => {
      const order = await actions.order.capture();
      this.paidFor = true;
      console.log(order);
    },
    onError: err => {
      console.log(err);
    }
  })
    .render(this.paypalElement.nativeElement);

}
onAutocompleteSelected(result: PlaceResult) {
  //console.log('onAutocompleteSelected: ', result);
  //console.log(result.formatted_address);
  this.form.controls['address'].setValue(result.formatted_address);
}
formChange(result: PlaceResult){

  var address;
  address = result;
  if (result.formatted_address != null) {
    address = result.formatted_address;
  }
  this.form.controls['address'].setValue(address);
  //console.log(this.form.get('address').value);

}

validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}

placeOrderButtonClicked(){

  if (!this.form.valid) {
    this.validateAllFormFields(this.form);
    alert('Shipping information is invalid.');
    return;
  }

  if (this.paidFor == false) {
    alert("Paid first!");
    return;
  }

  var cartId: number = 0;

  this.userService.getCurrentUser().subscribe(
    response => {
      cartId = response.cart.id;
      console.log(response);

      var checkoutData = {
        'userId': localStorage.getItem('userId'),
        'cartId': cartId,
        'first_name': this.firstname.value,
        'last_name': this.lastname.value,
        'phone': this.phone.value,
        'address': this.address.value
      }

      this.checkOutService.checkout(checkoutData).subscribe(
        checkoutResponse => {
          //console.log(checkoutResponse);
          alert('Order successfully created!');
          this.paidFor = false;
          this.router.navigate(['/search']);

          // TODO: Send email regarding order info to the user

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
