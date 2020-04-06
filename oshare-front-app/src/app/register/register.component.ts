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

    let formObj = this.form.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    this.userService.registerUser(this.form.getRawValue()).subscribe(
      response => {
        alert('User has been created');
      },
      error =>{
        console.log(error);
      }
    );
  }
}
