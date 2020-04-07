import { PostService } from './../../_services/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/_models/comment.model';
import { PostdetailService } from '../../_services/postdetail.service';
import { Product } from 'src/app/_models/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from 'src/app/_models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, PostdetailService]
})
export class PostDetailComponent implements OnInit {
  comments = [{ newComment: 'test' }]

  postDetail: Post;
  postComments: Comment[]
  relatedProducts: Product[]
  commentForm: FormGroup;
  loading = false;
  liked = false;
  likesNum = 0;
  response_object = null;

  p_comment;

  constructor(private formBuilder: FormBuilder,
    private postDetailService: PostdetailService, private postService: PostService, private http: HttpClient) {
    this.commentForm = this.formBuilder.group({
      username: '',
      firstName: '',
      lastName: '',
      date: new Date,
      newComment: ''
    });
    this.p_comment = this.commentForm;
    this.getPosts(); //Add by Fiona
  }
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  // Add by yinuod
  getUserByURL(full_url): Observable<any> {
    this.response_object = this.http.get(full_url, { headers: this.httpHeaders })
    //console.log(this.response_object)
    return this.response_object
  }

  //Add by Fiona
  getPosts = () => {
    this.postService.getAllPosts().subscribe(
      data => {
        this.postDetail = data;
        console.log("Fiona getAllPosts invoked");
        console.log(data);
        // for (let entry of data) {
        //   this.getUserByURL(entry['user']).subscribe(
        //     user_data => {
        //       console.log(user_data); 
        //     }
        //   );
        // }

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
    console.log(this.postDetail)
  }

  onCommentSubmit = () => {
    this.postService.createComment(this.p_comment.value).subscribe(
      data => {
        this.comments.push(data);
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
    console.log(this.p_comment.value)
    console.log(this.commentForm.value["newComment"])
  }



  onLike() {
    this.liked = !this.liked;
    if (this.liked) this.likesNum += 1
    else this.likesNum -= 1
    console.log("liked: " + this.liked);
  }

}
