import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Postdetail } from 'src/app/_models/postdetail.model';
import { Comment } from 'src/app/_models/comment.model';
import { PostdetailService } from '../../_services/postdetail.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  postDetail: Postdetail;
  postComments: Comment[]
  commentForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private postDetailService: PostdetailService) {
    this.commentForm = this.formBuilder.group({
      username: '',
      firstName: '',
      lastName: '',
      newComment: ''
    });
  }

  ngOnInit(): void {
    console.log("-----");
    this.postComments = this.postDetailService.getComments();
    this.postDetail = this.postDetailService.getPost();
    console.log(this.postComments)
  }

  onSubmit() {
    //do sth
    this.loading = true;
    console.log(this.commentForm.value['newComment']);
    this.commentForm.reset();
  }
}
