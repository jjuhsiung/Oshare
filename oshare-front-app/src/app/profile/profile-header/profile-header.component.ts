import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/_services/profile.service';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user.service';
import { Post } from 'src/app/_models/post.model';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
  providers: [ProfileService]
})
export class ProfileHeaderComponent implements OnInit {
  selectedProfile: any;
  userprofile: User;
  posts: Post[]
  default_image = 'https://i.pinimg.com/280x280_RS/78/28/3c/78283c0ec328cd2a2ae06366a610dbbc.jpg'

  constructor(private userservice: UserService, private profileService: ProfileService) {
    this.userprofile = new User();
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('userId'))
    this.userservice.getUserObjectById(localStorage.getItem('userId')).subscribe(
      data => {
        this.userprofile.firstName = data.first_name;
        this.userprofile.lastName = data.last_name;
        this.userprofile.username = data.username;

        this.profileService.getProfileByURL(data.profile.url).subscribe(
          profileData => {
            this.userprofile.profileImg = profileData.profile_picture;
            if (this.userprofile.profileImg == null) {
              this.userprofile.profileImg = this.default_image
              console.log(this.userprofile.profileImg)
            }
          }, error => {
            console.log(error);
          }
        );

        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

}
