import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  firstname = "";
  lastname = "";
  showModal: boolean;

  //login
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  message: any = "";
  
  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.checkLoginStatus()) {
      this.userService.getUserObjectById(localStorage.getItem('userId')).subscribe(
        data => {
          this.firstname = data.first_name;
          this.lastname = data.last_name;
        }, error => {
          console.log(error);
        }
      );
    }
  }

  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');

    if (this.router.url === '/cart' || this.router.url === '/new-post') {
      alert('Required login!');
      this.router.navigate(['/search']);
    } else {
      location.reload();
    }
  }

  get f() { return this.loginForm.controls; }

  checkLoginStatus() {
    return localStorage.getItem('userToken') != null;
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }
  onLogin() {
    let formObj = this.loginForm.getRawValue();
    if (this.loginForm.invalid) {
      this.message = 'Username or Password required!'
      this.loginForm.reset()
      return;
    }
    this.userService.loginUser(formObj).subscribe(
      response => {
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userId', response.id);
        alert('Logged in successfully!');
        window.location.reload();
      },
      error => {
        console.log(error);
        this.message = 'Wrong username or password!'
        this.loginForm.reset()
      }
    );
  }
}









