import { CommentService } from './../../_services/comment.service';
import { UserService } from './../../_services/user.service';
import { PostService } from './../../_services/post.service';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Comment } from 'src/app/_models/comment.model';
import { Post } from 'src/app/_models/post.model';
import { User } from 'src/app/_models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
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
  default_image = "https://cdn.clipart.email/b40fc2605be10cd3ea8f2e5e1b5db9f4_profile-clipart-default-user-9-market-access-transformation_960-960.jpeg"
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
      newComment: ['', [Validators.required, Validators.maxLength(300)]]
    });

    this.likesNum = this.likesNum;

  }


  get newComment() {
    return this.commentForm.get('newComment');
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

        for (var i = 0; i < response.images.length; i++) {
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

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onCommentSubmit() {

    if(!this.commentForm.valid){
      this.validateAllFormFields(this.commentForm);
      return;
    }

    const formdata = new FormData();
    formdata.append('user', this.userService.getUserURLById(localStorage.getItem('userId')));
    formdata.append('post', this.postService.getPostUrlById(this.postId));
    var comment = this.commentForm.get('newComment').value
    formdata.append('text', comment);

    this.commentService.writeComment(formdata).subscribe(
      response => {
        alert("Comment submit!")
        window.location.reload();
      }, error => {
        console.log(error);
      }
    );

  }

  toDetail(id): void {
    this.productService.ProductClick(id);
    this.router.navigate(['/product'], {
      queryParams: {
        'product_id': id,
      }
    });
  }
}
