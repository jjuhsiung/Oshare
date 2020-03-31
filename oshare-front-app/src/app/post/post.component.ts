import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  commentForm: FormGroup;
  loading = false;
  constructor(private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      username: String,
      comment: '',
      commenyTime: ''
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    //do sth
    this.loading = true;
    console.log(this.commentForm.value['comment'])
  }

}
