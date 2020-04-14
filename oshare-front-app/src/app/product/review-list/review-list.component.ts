import { Component, OnInit } from '@angular/core';
import {Review} from '../../_models/review.model';
import {REVIEWS} from '../../MockComments';
import {ProductService} from '../../_services/product.service';


@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
  providers: [ProductService]
})
export class ReviewListComponent implements OnInit {

  Reviews: Review[];
  // Reviews = REVIEWS;
  constructor(private api: ProductService) {
    // this.getReviews();
    this.Reviews = REVIEWS;
  }

  ngOnInit(): void {
  }

  getReviews = () => {
    this.api.getProductInfo().subscribe(
      data => {
        // TODO: split the data into two parts
        this.Reviews = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
