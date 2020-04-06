import { PostService } from './../../_services/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Postdetail } from 'src/app/_models/postdetail.model';
import { Comment } from 'src/app/_models/comment.model';
import { PostdetailService } from '../../_services/postdetail.service';
import { Product } from 'src/app/_models/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  response_object = null;
  constructor(private formBuilder: FormBuilder,
    private postDetailService: PostdetailService, private postService: PostService, private http: HttpClient) {
    this.commentForm = this.formBuilder.group({
      username: '',
      firstName: '',
      lastName: '',
      newComment: ''
    });
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
