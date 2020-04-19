import { Component, OnInit } from '@angular/core';
import { ReviewService } from "../_services/review.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css'],
})
export class AddReviewComponent implements OnInit {

  reviewForm: FormGroup;
  submitted = false;
  product_id = 0;
  product_title = '';
  product_img;
  rating: number;
  rating2: number;
  stars = [];
  fake_stars = [];
  durationInSeconds = 5;
  submitSuccess = false;
  closeResult: string;
  showModal = true;

  constructor(private formBuilder: FormBuilder,
              private api: ReviewService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('userToken') == null) {
      alert('Required Login!');
      this.router.navigate(['/search']);
    }

    const map = this.route.snapshot.queryParamMap;
    this.product_id = parseInt(map.get('product_id'));
    this.product_title = map.get('product_title');
    this.product_img = map.get('product_img');
    console.log(this.product_id);
    console.log(this.product_img);

    this.reviewForm = this.formBuilder.group({
      headline: [''],
      review: ['', Validators.required],
      rating: [0, Validators.required],
    });
  }

  get f() {
    return this.reviewForm.controls;
  }

  addreview() {
    this.submitted = true;
    if (this.reviewForm.invalid) {
      return;
    }
    this.submitSuccess = true;
    let formObj = this.reviewForm.getRawValue();
    const formData = new FormData();
    this.api.addReview(formObj.headline, formObj.review, this.rating, this.product_id);
  }

  redirect() {
    if (this.submitSuccess) {
      this.router.navigate(['/product'], {
        queryParams: {
          'product_id': this.product_id,
        }
      });
    }
  }
}
