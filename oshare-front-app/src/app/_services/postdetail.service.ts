import { Injectable } from '@angular/core';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class PostdetailService {
  allPosts: PostService
  imgTemp1 = 'https://upload.wikimedia.org/wikipedia/commons/5/59/That_Poppy_profile_picture.jpg'
  imgTemp = 'https://i.pinimg.com/280x280_RS/78/28/3c/78283c0ec328cd2a2ae06366a610dbbc.jpg'


  constructor(allPosts: PostService) {
    this.allPosts = allPosts;
    console.log("post-detail")
  }

  getPost() {
    console.log(this.allPosts.getPosts()[0])
    return this.allPosts.getPosts()[0];
  }
  getComments() {
    return this.allPosts.getPosts()[0].comments;
  }


}
