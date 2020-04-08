import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../../_services/post.service';
import { Post } from '../../../_models/post.model';

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

  likeBtnClicked() {
    let adder = 0;
    this.postService.updatePostLikes(this.post, this.post.likes + adder ).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      },
    );
  }

  // Post detail page could subscribe to this event and use information in this.post
  onSelected() {
    //console.log("On Selected");
    this.postService.postSelected.emit(this.post);
  }
}
