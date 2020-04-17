import { ProfileService } from './../_services/profile.service';
import { Router } from '@angular/router';
import { UserService } from './../_services/user.service';
import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
/// <reference types="@types/googlemaps" />
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  
  form;
  userURL: string = "";
  profileURL: string= "";
  public selectedAddress: PlaceResult;

  get username(){
    return this.form.get('username');
  }

  get password(){
    return this.form.get('password');
  }

  get first_name(){
    return this.form.get('first_name');
  }

  get last_name(){
    return this.form.get('last_name');
  }

  get email(){
    return this.form.get('email');
  }

  get phone(){
    return this.form.get('phone');
  }

  get address(){
    return this.form.get('address');
  }


  registration_form_value = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
  }

  constructor(fb: FormBuilder, 
    private userService: UserService, 
    private profileService: ProfileService,
    private router: Router) { 
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  registerUser(){

    const formData = new FormData();
    console.log(this.form.getRawValue());
    formData.append('first_name', this.form.get('first_name').value);
    formData.append('last_name', this.form.get('last_name').value);
    formData.append('username', this.form.get('username').value);
    formData.append('password', this.form.get('password').value);
    formData.append('email', this.form.get('email').value);

    this.userService.registerUser(formData).subscribe(
      response => {
        this.profileURL = response.profile.url;
        const pForm = new FormData();
        pForm.append('phone', this.form.get('phone').value);
        pForm.append('address', this.form.get('address').value);

        this.profileService.editProfileByURL(this.profileURL, pForm).subscribe(
          response => {
            console.log(response);
            alert('User has been created');
            this.router.navigate(['/login']);
          }, error =>{
            console.log(error);
          }
        )

      },
      error =>{
        console.log(error);
      }
    );
  }

  onAutocompleteSelected(result: PlaceResult) {
    //console.log('onAutocompleteSelected: ', result);
    //console.log(result.formatted_address);
    this.form.controls['address'].setValue(result.formatted_address);
  }

}


