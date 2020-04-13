import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../_services/product.service';
import {ReviewService} from "../../_services/review.service";
import {User} from "../../_models/user.model";
import { UserService } from './../../_services/user.service';


@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent implements OnInit {

  Reviews: any;
  id = 0;
  // Reviews = REVIEWS;
  constructor(private api: ProductService, private reviewapi: ReviewService, private userService: UserService) {
    this.id = this.api.currentproduct;
    reviewapi.reviewsupdate.subscribe(data=>{
      this.Reviews = [];
      for (let i = 0;i< data.length;i++)
      {
        let review = {
          'review': data[i],
          'user': new User(),
        }
        this.userService.getUserObjectByURL(review.review.user).subscribe(
          userdata => {
            review.user.firstName = userdata.first_name;
            review.user.lastName = userdata.last_name;
            review.user.username = userdata.username;
            this.Reviews.push(review);
          }, error => {
            console.log(error);
          })
      }
    });
    this.reviewapi.getReviews(this.id);
  }

  ngOnInit(): void {
  }
}
