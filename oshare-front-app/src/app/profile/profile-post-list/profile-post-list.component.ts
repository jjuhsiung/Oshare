import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/post.model';
import { PostService } from 'src/app/_services/post.service';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-profile-post-list',
  templateUrl: './profile-post-list.component.html',
  styleUrls: ['./profile-post-list.component.css']
})
export class ProfilePostListComponent implements OnInit {

  posts: Post[];
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts = [];
    this.postService.getPostByUser(localStorage.getItem('userId')).subscribe(
      p_post => {
        console.log(p_post)
        for (var i = 0; i < p_post.length; i++) {
          // console.log(p_post[i].images[0].image)
          let post = new Post(p_post[i].id, new User(), p_post[i].images[0]
            , p_post[i].date, p_post[i].text, p_post[i].title, p_post[i].comments, p_post[i].likes, p_post[i].relatedProducts);
          this.posts.push(post)
        }
        console.log(this.posts);

      }, error => {
        console.log(error);
      }
    );
  }
}
