import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  form;

  get username(){
    return this.form.get('username');
  }

  get password(){
    return this.form.get('password');
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

  get email(){
    return this.form.get('email');
  }



  constructor(fb: FormBuilder) { 
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  registerButtonClicked(){

  }

  register(){

  }
}
