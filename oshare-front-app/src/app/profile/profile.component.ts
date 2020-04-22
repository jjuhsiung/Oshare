import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ProfileService } from '../_services/profile.service';
import { Profile } from '../_models/profile.model';
import { User } from '../_models/user.model';
/// <reference types="@types/googlemaps" />
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, ProfileService, UserService]
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  file: File;
  userURL: string;
  userprofile: Profile = new Profile("", "", "");
  userProfileURL: string = "";
  user: User = new User();
  imgTypeCheck:boolean = true;
  public selectedAddress: PlaceResult;

  constructor(private formbuilder: FormBuilder, private router: Router,
    private userService: UserService, private profileService: ProfileService) {
    this.form = this.formbuilder.group({
      first_name: ['', [Validators.required, Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.maxLength(150)]],
      username: ['', [Validators.required, Validators.maxLength(150)]],
      email: ['', [Validators.required, Validators.pattern(/^([a-z\d\.~]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/)]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      address: ['', [Validators.required, Validators.maxLength(60)]],
    })
  }
  get first_name() {
    return this.form.get('first_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
  get username() {
    return this.form.get('username');
  }
  get email() {
    return this.form.get('email');
  }
  //profile:
  get phone() {
    return this.form.get('phone');
  }
  get address() {
    return this.form.get('address');
  }
  get profile_picture() {
    return this.form.get('profile_picture');
  }



  ngOnInit(): void {
    if (localStorage.getItem('userToken') == null) {
      alert('Required Login!');
      this.router.navigate(['/search'])
    }

    this.userService.getCurrentUser().subscribe(
      data => {
        console.log(data);
        this.user.firstName = data.first_name;
        this.user.lastName = data.last_name;
        this.user.username = data.username;
        this.user.email = data.email;
        this.userProfileURL = data.profile.url;
        console.log(this.userProfileURL);
        this.profileService.getProfileByURL(this.userProfileURL).subscribe(
          profileData => {
            this.userprofile.phone = profileData.phone;
            this.userprofile.address = profileData.address;
            this.userprofile.profile_picture = profileData.profile_picture;

            this.form.controls['first_name'].setValue(this.user.firstName);
            this.form.controls['last_name'].setValue(this.user.lastName);
            this.form.controls['username'].setValue(this.user.username);
            this.form.controls['email'].setValue(this.user.email);
            this.form.controls['phone'].setValue(this.userprofile.phone);
            this.form.controls['address'].setValue(this.userprofile.address);
          }, error => {
            console.log(error);
          }
        );
      }, error => {
      }
    );

  }

  fileChanged(event){
    var file = <File>event.target.files[0];
    this.imgTypeCheck = this.checkExtension(file.name);
    if(this.imgTypeCheck){
      this.file = file;
    }
  }

  checkExtension(filename) {
    let valToLower = filename.toLowerCase();
    let regex = new RegExp("(.*?)\.(jpg|png|jpeg)$"); //add or remove required extensions here
    return regex.test(valToLower);
  }

  OnEditUser() {

    if(this.form.valid && this.imgTypeCheck){
      this.userURL = this.userService.getUserURLById(localStorage.getItem('userId'));
      const formData = new FormData();
      formData.append('user', this.userURL);
      formData.append('first_name', this.form.get('first_name').value);
      formData.append('last_name', this.form.get('last_name').value);
      formData.append('username', this.form.get('username').value);
      formData.append('email', this.form.get('email').value);

      const pForm = new FormData();
      pForm.append('user', this.userURL);
      pForm.append('phone', this.form.get('phone').value);
      pForm.append('address', this.form.get('address').value);
      if (this.file != null) {
        pForm.append('profile_picture', this.file, this.file.name);
      }
      this.profileService.editUser(this.form.getRawValue()).subscribe(
        response => {
          console.log(response)
        },
        error => {
          console.log(error);
        }
      );
      this.profileService.editProfileByURL(this.userProfileURL, pForm).subscribe(
        response => {
          console.log(response);
          alert('User profile successfully edit!');
          window.location.reload();
        },
        error => {
          console.log(error);
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
  onAutocompleteSelected(result: PlaceResult) {
    //console.log('onAutocompleteSelected: ', result);
    //console.log(result.formatted_address);
    this.form.controls['address'].setValue(result.formatted_address);
  }
}
