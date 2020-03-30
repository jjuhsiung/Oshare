import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  onSelected() {
    this.postService.postSelected.emit(this.post);
  }
}
