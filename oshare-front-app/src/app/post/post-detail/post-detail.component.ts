import { CommentService } from './../../_services/comment.service';
import { UserService } from './../../_services/user.service';
import { PostService } from './../../_services/post.service';
import { Component, OnInit, Input, SystemJsNgModuleLoader } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/_models/comment.model';
import { Product } from 'src/app/_models/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from 'src/app/_models/post.model';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService, CommentService]
})
export class PostDetailComponent implements OnInit {

  @Input() postId: number;
  comments = [{ newComment: 'test' }]

  post: Post;
  user: User;
  postComments: Comment[] = [];
  relatedProducts: Product[]
  commentForm: FormGroup;
  loading = false;
  liked = false;
  likesNum = 0;
  response_object = null;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private userService: UserService, 
    private commentService: CommentService,
    private http: HttpClient) {
  
    this.user = new User();
    this.post = new Post(this.postId, this.user)

    this.commentForm = this.formBuilder.group({
      newComment: ''
    });
    
    this.likesNum = this.likesNum;

  }

  ngOnInit(): void {
    this.postService.getPostById(this.postId).subscribe(
      response => {
        this.userService.getUserObjectByURL(response.user).subscribe(
          userdata =>{
            this.post.user.firstName = userdata.first_name;
            this.post.user.lastName = userdata.last_name;
            this.post.user.username = userdata.username;
          }, error =>{
            console.log(error);
          }
        );
        this.post.postDate = response.date;
        this.post.postTitle = response.title;
        this.post.postText = response.text;
        this.post.likes = response.likes;
        this.post.imagePath = response.images[0].image;
        this.post.comments = [];
        var commentArr = response.comments;;
        for(var i=0; i<commentArr.length; i++){
          console.log(commentArr[i].text);
          let comment = new Comment(new User(), commentArr[i].text);
          this.userService.getUserObjectByURL(commentArr[i].user).subscribe(
            userdata =>{
              comment.user.firstName = userdata.first_name;
              comment.user.lastName = userdata.last_name;
              comment.user.username = userdata.username;
              this.post.comments.push(comment);
            }, error =>{
              console.log(error);
            }
          );
        }
        console.log(this.post.comments);
      }, error =>{
        console.log(error);
      }
    );
  }

  onCommentSubmit(){
    const formdata = new FormData();
    formdata.append('user', this.userService.getUserURLById(localStorage.getItem('userId')));
    formdata.append('post', this.postService.getPostUrlById(this.postId));
    formdata.append('text', this.commentForm.get('newComment').value);
    this.commentService.writeComment(formdata).subscribe(
      response =>{
      }, error => {
        console.log(error);
      }
    );
    window.location.reload();
  }

  onLike() {
    this.liked = !this.liked;
    if (this.liked) this.likesNum += 1
    else this.likesNum -= 1
    console.log("liked: " + this.liked);
  }

}
