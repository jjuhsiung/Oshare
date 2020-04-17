import { ProfileService } from './../_services/profile.service';
import { Router } from '@angular/router';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  form;
  userURL: string = "";
  profileURL: string= "";

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

  get city(){
    return this.form.get('city');
  }

  get state(){
    return this.form.get('state');
  }

  get zip_code(){
    return this.form.get('zip_code');
  }

  registration_form_value = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: ''
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
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip_code: ['', Validators.required]
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
}
