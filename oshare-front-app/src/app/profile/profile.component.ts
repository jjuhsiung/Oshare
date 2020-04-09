import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { ProfileService } from '../_services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, ProfileService, UserService]
})
export class ProfileComponent implements OnInit {
  form;
  file: File[] = null;
  userURL: string;
  profileService: ProfileService;
  profileURL: string;

  constructor(formbuilder: FormBuilder, private router: Router,
    private userService: UserService, profileService: ProfileService) {
    this.form = formbuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      profileImage: [Image, Validators.required]
    })
  }
  get first_name() {
    return this.form.get('first_name');
  }

  get last_name() {
    return this.form.get('last_name');
  }
  ngOnInit(): void {
    if (localStorage.getItem('userToken') == null) {
      alert('Required Login!');
      this.router.navigate(['/search'])
    }
  }

  fileChanged(event) {
    this.file = <File[]>event.target.files;
  }

  OnEditProfile() {
    this.userURL = this.userService.getUserURLById(localStorage.getItem('userId'));
    const formData = new FormData();
    formData.append('user', this.userURL);
    formData.append('first_name', this.form.get('first_name').value);
    formData.append('last_name', this.form.get('last_name').value);
    formData.append('profileImage', this.form.get('profileImage').value);

    this.profileService.editProfile(formData).subscribe(
      response => {
        this.profileURL = response.url;
        //TODO
        alert('Profile successfully edit!');
        this.router.navigate(['/search'])
      },

      error => {
        console.log(error);
      }
    );

  }
}


