import { Component, OnInit } from '@angular/core';
import { ReviewService } from "../_services/review.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../_services/user.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  reviewForm: FormGroup;
  submitted = false;
  product_id=0;
  product_title='';

  constructor(private formBuilder: FormBuilder,
              private api:ReviewService,
              private router:Router,
              private route:ActivatedRoute,
              private userService:UserService,
              ) { }

  ngOnInit(): void {
    if(localStorage.getItem('userToken') == null){
      alert('Required Login!');
      this.router.navigate(['/search'])
    }

    const map = this.route.snapshot.queryParamMap;
    this.product_id = parseInt(map.get('product_id'));
    this.product_title = map.get('product_title');

    this.reviewForm = this.formBuilder.group({
      headline: ['', Validators.required],
      review: ['', Validators.required],
      rating: [0, Validators.required],
    });
  }

  get f() { return this.reviewForm.controls; }

  addreview(){
    let formObj = this.reviewForm.getRawValue();
    const formData = new FormData();
    // formData.append('user', this.userService.getUserURLById(localStorage.getItem('userId')));
    // formData.append('headline', formObj.headline);
    // formData.append('review', formObj.review);
    // formData.append('rating', formObj.rating);
    // formData.append('product', formObj.product_id)
    this.api.addReview(formObj.headline, formObj.review, formObj.rating, this.product_id);
    // this.api.addReview(formData);
    alert("add one Review Succeed!");
    this.router.navigate(['/search']);
  }

}
