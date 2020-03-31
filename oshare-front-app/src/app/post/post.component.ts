import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  commentForm: FormGroup;
  loading = false;
  comments = [{ text: 'hahahah' }, { text: 'second comment' }]//service get
  postText = [{ text: 'conetent1' }, { text: 'content2' }] //service get
  fullName: string;
  postDate: Date;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
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
