import { PostService } from './../../_services/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Postdetail } from 'src/app/_models/postdetail.model';
import { Comment } from 'src/app/_models/comment.model';
import { PostdetailService } from '../../_services/postdetail.service';
import { Product } from 'src/app/_models/product.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {


  postDetail: Postdetail;
  postComments: Comment[]
  relatedProducts: Product[]
  commentForm: FormGroup;
  loading = false;
  liked = false;
  likesNum = 0;

  constructor(private formBuilder: FormBuilder,
    private postDetailService: PostdetailService, private postService: PostService) {
    this.commentForm = this.formBuilder.group({
      username: '',
      firstName: '',
      lastName: '',
      newComment: ''
    });
    this.getPosts(); //Add by Fiona
  }

  //Add by Fiona
  getPosts = () => {
    this.postService.getAllPosts().subscribe(
      data => {
        this.postDetail = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    )
  }


  ngOnInit(): void {
    console.log("--oninit--");
    this.postComments = this.postDetailService.getComments();
    this.postDetail = this.postDetailService.getPost();
    this.relatedProducts = this.postDetailService.getProducts();
    this.likesNum = this.likesNum;
    console.log(this.postComments + " comments")
    console.log(this.relatedProducts)
  }

  onSubmit() {
    //do sth
    this.loading = true;
    console.log(this.commentForm.value['newComment']);
    this.commentForm.reset();
  }

  onLike() {
    this.liked = !this.liked;
    if (this.liked) this.likesNum += 1
    else this.likesNum -= 1
    console.log("liked: " + this.liked);
  }

}
