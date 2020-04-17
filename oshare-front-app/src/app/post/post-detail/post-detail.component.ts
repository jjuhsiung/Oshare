import { CommentService } from './../../_services/comment.service';
import { UserService } from './../../_services/user.service';
import { PostService } from './../../_services/post.service';
import { Component, OnInit, Input, SystemJsNgModuleLoader } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/_models/comment.model';
import { Product } from 'src/app/_models/product.model';
import { Post } from 'src/app/_models/post.model';
import { User } from 'src/app/_models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/_models/profile.model';
import { ProfileService } from 'src/app/_services/profile.service';
import { ProductService } from "../../_services/product.service";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService, CommentService]
})
export class PostDetailComponent implements OnInit {
  comments = [{ newComment: 'test' }]

  postId: number;
  post: Post;
  user: User;
  postComments: Comment[] = [];
  default_image = "https://i.pinimg.com/280x280_RS/78/28/3c/78283c0ec328cd2a2ae06366a610dbbc.jpg"
  commentForm: FormGroup;
  loading = false;
  liked = false;
  likesNum = 0;
  response_object = null;
  post_products: Array<object> = [];
  related_product_title: string = "";
  profile_picture: any;
  userProfileURL: string = "";
  class: string = ""
  postImages = []

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) {

    this.user = new User();
    this.post = new Post(this.postId, this.user)

    this.commentForm = this.formBuilder.group({
      newComment: ''
    });

    this.likesNum = this.likesNum;

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      params => {
        this.postId = Number(params.get('id'));
      });
    this.postService.getPostById(this.postId).subscribe(
      response => {
        console.log(response);
        this.userService.getUserObjectByURL(response.user).subscribe(
          userdata => {
            this.post.user.firstName = userdata.first_name;
            this.post.user.lastName = userdata.last_name;
            this.post.user.username = userdata.username;
          }, error => {
            console.log(error);
          }
        );
        this.post.postDate = response.date;
        this.post.postTitle = response.title;
        this.post.postText = response.text;
        this.post.likes = response.likes;
        this.post.imagePath = response.images;
        this.post_products = response.products;
        this.userProfileURL = response.user;
        console.log(this.userProfileURL)

        for(var i = 0; i < response.images.length; i++){
          this.postImages[i] = response.images[i].image
        }

        this.profileService.getProfileByURL(this.userProfileURL).subscribe(
          profileData => {
            this.profile_picture = profileData.profile.profile_picture;
            if (this.profile_picture == null) {
              this.profile_picture = this.default_image;
            }
          }, error => {
            console.log(error);
          }
        );

        if (this.post_products.length != 0) {
          this.related_product_title = "Shop this look"
          this.class = "page-header"
        }

        console.log("this-post-products");
        console.log(this.post_products);

        //this.post.relatedProducts = response.products;
        this.post.comments = [];
        var commentArr = response.comments;
        for (var i = 0; i < commentArr.length; i++) {
          console.log(commentArr[i].text);
          let comment = new Comment(new User(), commentArr[i].text);
          this.userService.getUserObjectByURL(commentArr[i].user).subscribe(
            userdata => {
              comment.user.firstName = userdata.first_name;
              comment.user.lastName = userdata.last_name;
              comment.user.username = userdata.username;
              this.post.comments.push(comment);
            }, error => {
              console.log(error);
            }
          );
        }
        if (commentArr.length == 0) {
          this.post.comments.push(new Comment(null, 'No comments yet'));
        }
        console.log(this.post.comments);
      }, error => {
        console.log(error);
      }
    );
  }

  onCommentSubmit() {
    const formdata = new FormData();
    formdata.append('user', this.userService.getUserURLById(localStorage.getItem('userId')));
    formdata.append('post', this.postService.getPostUrlById(this.postId));
    formdata.append('text', this.commentForm.get('newComment').value);
    this.commentService.writeComment(formdata).subscribe(
      response => {
      }, error => {
        console.log(error);
      }
    );
    alert("comment submit!")
    window.location.reload();
  }

  onLike() {
    this.liked = !this.liked;
    if (this.liked) this.likesNum += 1
    else this.likesNum -= 1
    console.log("liked: " + this.liked);
  }

  toDetail(id): void {
    this.productService.addClick(id);
    this.router.navigate(['/product'], {
      queryParams: {
        'product_id': id,
      }
    });
  }
}
