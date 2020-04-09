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
    let image_path = 'https://i.pinimg.com/280x280_RS/78/28/3c/78283c0ec328cd2a2ae06366a610dbbc.jpg';
    this.postService.getPostByUser(localStorage.getItem('userId')).subscribe(
      p_post => {
        console.log(p_post)
        for (let entry of p_post) {
          // if (entry['images'].length != 0) {
          // console.log(entry['images'][0]['image']);
          //   image_path = entry['images'][0]['image'];
          // }
          let post = new Post(entry.id, new User(), image_path
            , entry.date, entry.text, entry.title, entry.comments, entry.likes, entry.relatedProducts);
          this.posts.push(post)
        }
        console.log(this.posts);

      }, error => {
        console.log(error);
      }
    );
  }
}
