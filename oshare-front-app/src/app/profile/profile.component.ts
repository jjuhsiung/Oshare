import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ProfileService } from '../_services/profile.service';
import { Profile } from '../_models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, ProfileService, UserService]
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  profileForm: FormGroup;
  file: File;
  userURL: string;
  userprofile: Profile = new Profile("", "", "");
  userProfileURL: string = "";

  constructor(formbuilder: FormBuilder, private router: Router,
    private userService: UserService, private profileService: ProfileService) {
    this.form = formbuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['']
    })


    this.profileForm = formbuilder.group({
      phone: [''],
      address: [''],
      //profile_picture: ['']
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
    return this.profileForm.get('phone');
  }
  get address() {
    return this.profileForm.get('address');
  }
  get profile_picture() {
    return this.profileForm.get('profile_picture');
  }



  ngOnInit(): void {
    if (localStorage.getItem('userToken') == null) {
      alert('Required Login!');
      this.router.navigate(['/search'])
    }

    this.userService.getUserObjectById(localStorage.getItem('userId')).subscribe(
      data=>{
        this.userProfileURL = data.profile;
        console.log(this.userProfileURL);
        this.profileService.getProfileByURL(this.userProfileURL).subscribe(
          profileData => {
            this.userprofile.phone = profileData.phone;
            this.userprofile.address = profileData.address;
            this.userprofile.profile_picture = profileData.profile_picture;
            console.log(this.userprofile);
          }, error => {
            console.log(error);
          }
        );
      }, error=>{
        console.log(error);
      }
    );

  }

  fileChanged(event) {
    this.file = <File>event.target.files[0];
  }

  OnEditUser() {
    this.userURL = this.userService.getUserURLById(localStorage.getItem('userId'));
    const formData = new FormData();
    formData.append('user', this.userURL);
    formData.append('first_name', this.form.get('first_name').value);
    formData.append('last_name', this.form.get('last_name').value);
    formData.append('username', this.form.get('username').value);
    formData.append('email', this.form.get('email').value);

    this.profileService.editUser(this.form.getRawValue()).subscribe(
      response => {
        alert('User info successfully edit!');
      },
      error => {
        console.log(error);
      }
    );
    window.location.reload();
  }

  OnEditProfile() {
    this.userURL = this.userService.getUserURLById(localStorage.getItem('userId'));
    const formData = new FormData();
    formData.append('user', this.userURL);
    formData.append('phone', this.profileForm.get('phone').value);
    formData.append('address', this.profileForm.get('address').value);
    if (this.file != null) {
      formData.append('profile_picture', this.file, this.file.name);
    }

    this.profileService.editProfileByURL(this.userProfileURL, formData).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
    alert('User profile successfully edit!');
    window.location.reload();
  }
}


