import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  form;
  baseurl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

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

  send_email(): Observable<any> {
      return this.http.post<any>(this.baseurl + '/send_template_email/',
                                { title: 'Angular POST Request Example',
                                  username: this.form.getRawValue()['username'].toString(),
                                  firstname: this.form.getRawValue()['first_name'].toString(),
                                  lastname: this.form.getRawValue()['last_name'].toString(),
                                  email: this.form.getRawValue()['email'].toString()
                                },
                                { headers: this.httpHeaders});
  }


  registration_form_value = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: ''
  }

  constructor(fb: FormBuilder, private userService: UserService, private router: Router, private http: HttpClient) {
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
    this.userService.registerUser(this.form.getRawValue()).subscribe(
      response => {
        alert('User has been created');
        this.router.navigate(['/login']);

        // TODO: Send confirm email to newly registered user
        this.send_email().subscribe(
          data => {
            console.log("SEND EMAIL FUNCTION CALLED");
            console.log(data);
          },
          error => {
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
