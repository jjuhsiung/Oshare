import { Injectable } from '@angular/core';
import { PostService } from './post.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostdetailService {
  allPosts: PostService
  imgTemp1 = 'https://upload.wikimedia.org/wikipedia/commons/5/59/That_Poppy_profile_picture.jpg'
  imgTemp = 'https://i.pinimg.com/280x280_RS/78/28/3c/78283c0ec328cd2a2ae06366a610dbbc.jpg'

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(allPosts: PostService, private http: HttpClient) {
    this.allPosts = allPosts;
    console.log("post-detail")
  }

  /**
   * get from pots service
   */
  getPost() {
    console.log(this.allPosts.getPosts()[0])
    return this.allPosts.getPosts()[0];
  }
  getComments() {
    return this.allPosts.getPosts()[0].comments;
  }
  getProducts() {
    console.log(this.allPosts.getPosts()[0].relatedProducts)
    return this.allPosts.getPosts()[0].relatedProducts;
  }


}
