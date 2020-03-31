import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  commentForm: FormGroup;
  loading = false;
  comments = [{ text: 'hahahah' }, { text: 'second comment' }]//service get
  postText = [{ text: 'conetent1' }, { text: 'content2' }] //service get
  fullName: string;
  postDate: Date;

  constructor(private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      comment: '',
      commenyTime: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    //do sth
    this.loading = true;
    console.log(this.commentForm.value['comment']);
    this.commentForm.reset();
  }
}
