// import { Router } from '@angular/router';
// import { UserService } from './../_services/user.service';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
//   providers: [UserService]
// })


// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   submitted = false;
//   loading = false;
//   message: any;

//   constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {

//   }

//   ngOnInit(): void {
//     if (localStorage.getItem('userToken') != null) {
//       this.router.navigate(['/search'])
//     }

//     this.loginForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   get f() { return this.loginForm.controls; }

//   onLogin() {
//     let formObj = this.loginForm.getRawValue();
//     if (this.loginForm.invalid) {
//       this.message = 'Username or Password required!'
//       this.loginForm.reset()
//       return;
//     }
//     this.userService.loginUser(formObj).subscribe(
//       response => {
//         localStorage.setItem('userToken', response.token);
//         localStorage.setItem('userId', response.id);
//         alert('Logged in successfully!');
//         this.router.navigate(['/search']);
//       },
//       error => {
//         console.log(error);
//         this.message = 'Wrong username or password!'
//         this.loginForm.reset()
//       }

//     );
//   }
// }



