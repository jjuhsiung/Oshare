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


  registration_form_value = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: ''
  }

  constructor(fb: FormBuilder, private userService: UserService) { 
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  registerUser(){

    this.mapFormToObject();
    this.userService.registerUser(this.form.getRawValue()).subscribe(
      response => {
        alert('User has been created');
      },
      error =>{
        console.log(error);
      }
    );
  }

  mapFormToObject(){
    this.registration_form_value.username = this.form.value.username;
    this.registration_form_value.password = this.form.value.password;
    this.registration_form_value.first_name = this.form.value.first_name;
    this.registration_form_value.last_name = this.form.value.last_name;
    this.registration_form_value.email = this.form.value.email;
  }
}
