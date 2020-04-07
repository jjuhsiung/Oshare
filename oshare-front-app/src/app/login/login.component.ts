import { Router } from '@angular/router';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router : Router) {

  }

  ngOnInit(): void {
    if(localStorage.getItem('userToken') != null){
      this.router.navigate(['/search'])
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  // onSubmit() {
  //   this.submitted = true;
  //   console.log("submited: " + this.submitted)
  //   console.log(this.loginForm.value)
  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  //   this.loading = true;
  //   this.loginForm.reset();
  // }

  onLogin(){
    let formObj = this.loginForm.getRawValue();
    this.userService.loginUser(formObj).subscribe(
      response => {
        //console.log(response);
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userId', response.id);
        alert('Logged in successfully!');
        this.router.navigate(['/search']);
      },
      error =>{
        console.log(error);
      }
    );
  }
}



