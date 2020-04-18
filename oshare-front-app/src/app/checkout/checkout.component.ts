import { ProductService } from './../_services/product.service';
import { UserService } from 'src/app/_services/user.service';
import { firstNameValidators } from './validators/firstname.validator';
import { CheckoutService } from '../_services/checkout.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

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

  productSummary: string = "";
  totalPrice: number = 0;
  paidFor: boolean = false;

  constructor(private checkOutService: CheckoutService,
    private userService: UserService,
    private productService: ProductService,
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

    this.userService.getUserObjectById(localStorage.getItem('userId')).subscribe(
      Response =>{
        for(let i=0; i<Response.cart.productCounts.length; i++){
          this.productService.getProductByURL(Response.cart.productCounts[i].product).subscribe(
            product_data=>{
              this.totalPrice += product_data.price * Response.cart.productCounts[i].count;
              this.productSummary+= product_data.name + " x" + Response.cart.productCounts[i].count+", ";
            }, error=>{
              console.log(error);
            }
          )


        }
        console.log(this.productSummary);
        console.log(this.totalPrice);




      }, error => {
        console.log(error);
      }
    )
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
    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.totalPrice.toString()
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

  placeOrderButtonClicked(){

    if(this.paidFor == false){
      alert("paid first!");
      return;
    }

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

        this.checkOutService.checkout(checkoutData).subscribe(
          checkoutResponse=>{
            //console.log(checkoutResponse);
            alert('Order successfully created!');
            this.paidFor = false;
            this.router.navigate(['/order-history']);

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
