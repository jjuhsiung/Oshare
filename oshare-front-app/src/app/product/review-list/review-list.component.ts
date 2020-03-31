import { Component, OnInit } from '@angular/core';
import {Review} from '../../models/review';
import {REVIEWS} from '../../MockComments';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  Reviews: Review[];
  constructor() {
    this.getReviews();
  }

  ngOnInit(): void {
  }

  getReviews(){
    this.Reviews = REVIEWS;
  }

}
