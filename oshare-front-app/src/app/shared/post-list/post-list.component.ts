import { Component, OnInit } from '@angular/core';
import { Post } from '../../_models/post.model';
import { PostService } from '../../_services/post.service'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.constructPostList();
    this.posts = this.postService.post_list;
    console.log(this.postService.post_list);
    console.log(this.posts);
  }
}
