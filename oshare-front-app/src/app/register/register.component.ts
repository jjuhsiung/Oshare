import { ProfileService } from './../_services/profile.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './../_services/user.service';
import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import PlaceResult = google.maps.places.PlaceResult;
import { baseurl } from "../MockComments";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  message: any;
  form;
  baseurl = baseurl;
  // baseurl = 'http://127.0.0.1:8000';
  // baseUrl: 'http://ec2-54-183-253-130.us-west-1.compute.amazonaws.com:8000';
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  userURL: string = "";
  profileURL: string = "";
  public selectedAddress: PlaceResult;

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get first_name() {
    return this.form.get('first_name');
  }

  get last_name() {
    return this.form.get('last_name');
  }

  get email() {
    return this.form.get('email');
  }

  get phone() {
    return this.form.get('phone');
  }

  get address() {
    return this.form.get('address');
  }

  send_email(): Observable<any> {
    return this.http.post<any>(this.baseurl + '/send_template_email/',
      {
        title: 'Angular POST Request Example',
        username: this.form.getRawValue()['username'].toString(),
        firstname: this.form.getRawValue()['first_name'].toString(),
        lastname: this.form.getRawValue()['last_name'].toString(),
        email: this.form.getRawValue()['email'].toString()
      },
      { headers: this.httpHeaders });
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
    private router: Router,
    private http: HttpClient) {
    this.form = fb.group({
      username: ['', [Validators.required, Validators.maxLength(150)]],
      password: ['', Validators.required],
      first_name: ['', [Validators.required, Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      address: ['', [Validators.required, Validators.maxLength(60)]],
    });
  }

  ngOnInit(): void {
  }

  registerUser() {

    if (this.form.valid) {
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

              this.send_email().subscribe(
                data => {
                  console.log("SEND EMAIL FUNCTION CALLED");
                  console.log(data);
                },
                error => {
                  console.log(error);
                }
              )
            }, error => {
              this.message = error;
              console.log(this.message)
            }
          )
        },
        error => {
          this.message = error;
          console.log(this.message);
        }
      );
    } else {
      this.validateAllFormFields(this.form);
    }

  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  formChange(result: PlaceResult) {

    var address;
    address = result;
    if (result.formatted_address != null) {
      address = result.formatted_address;
    }
    this.form.controls['address'].setValue(address);
    //console.log(this.form.get('address').value);

  }
}
