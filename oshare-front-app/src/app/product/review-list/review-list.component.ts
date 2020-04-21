import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../_services/product.service';
import {ReviewService} from '../../_services/review.service';
import {User} from '../../_models/user.model';
import { UserService } from './../../_services/user.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent implements OnInit {

  Reviews: any;
  id = 0;
  default_image = 'https://cdn.clipart.email/b40fc2605be10cd3ea8f2e5e1b5db9f4_profile-clipart-default-user-9-market-access-transformation_960-960.jpeg';
  // Reviews = REVIEWS;
  constructor(private api: ProductService, private reviewapi: ReviewService, private userService: UserService, private route: ActivatedRoute) {
    console.log(this.route);
    this.id = parseInt(this.route.parent.snapshot.queryParamMap.get('product_id'));
    reviewapi.reviewsupdate.subscribe(data => {
      this.Reviews = [];
      for (let i = 0; i < data.length; i++) {
        const review = {
          review: data[i],
          user: new User(),
        };
        this.userService.getUserObjectByURL(review.review.user).subscribe(
          userdata => {
            // console.log(userdata.profile.profile_picture);
            review.user.firstName = userdata.first_name;
            review.user.lastName = userdata.last_name;
            review.user.username = userdata.username;
            review.user.profileImg = userdata.profile.profile_picture;
            this.Reviews.push(review);
          }, error => {
            console.log(error);
          });
      }
      // console.log(this.Reviews.length);
      // this.reviewNum = this.Reviews.length;
    });
    this.reviewapi.getReviews(this.id);
    // console.log(this.Reviews.length);
  }

  ngOnInit(): void {
  }

  checkReview(reviews): number {
    // console.log(reviews);
    return reviews.length;
  }

  checkImg(img): string{
    console.log(img);
    if(img!=null)
    {
      return img;
    }
    return this.default_image;
  }
}
