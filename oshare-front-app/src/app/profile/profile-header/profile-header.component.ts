import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/_services/profile.service';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
  providers: [ProfileService]
})
export class ProfileHeaderComponent implements OnInit {
  selectedProfile: any;
  userprofile: User;

  constructor(private userservice: UserService) {
    this.userprofile = new User();
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('userId'))
    this.userservice.getUserObjectById(localStorage.getItem('userId')).subscribe(
      userdata => {
        this.userprofile.firstName = userdata.firstName;
        this.userprofile.lastName = userdata.last_name;
        this.userprofile.username = userdata.username;
        this.userprofile.profileImg = userdata.profile_picture;
        console.log(userdata);

      }, error => {
        console.log(error);
      }
    );
    console.log(this.userprofile)
  }

}
