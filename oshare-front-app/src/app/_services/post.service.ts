import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Post } from '../_models/post.model';
import { Comment } from '../_models/comment.model';
import { User } from '../_models/user.model';
import { Product } from '../_models/product.model';
import { PostImageService } from './post-image.service'

@Injectable({
    providedIn: 'root'
})
export class PostService {
    imgProd = "https://i.ibb.co/C23xGSj/u221.png";
    imgTemp1 = 'https://upload.wikimedia.org/wikipedia/commons/5/59/That_Poppy_profile_picture.jpg'
    imgTemp = 'https://i.pinimg.com/280x280_RS/78/28/3c/78283c0ec328cd2a2ae06366a610dbbc.jpg'
    postSelected = new EventEmitter<Post>();
    response_object = null;
    public post_list: Post[] = [];

    baseurl = "http://127.0.0.1:8000";
    httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient, private postImageService: PostImageService) {
        console.log("post-service")
    };

    getPosts() {
        this.getAllPosts();
        //console.log(this.posts.slice());
        return this.post_list.slice();// get a copy
    }

    updatePostLikes(post: Post, latest_like: number): Observable<any> {
      // /update_post_likes/?latest_like=10
      return this.http.post<any>(this.baseurl + '/posts/' + post.postId + '/update_post_likes/' + '?latest_like=' + latest_like, "");
    }

    getAllPosts(): Observable<any> {
        this.response_object = this.http.get(this.baseurl + '/posts/', { headers: this.httpHeaders });
        return this.response_object;
    }

    createPosts(postData): Observable<any> {
        return this.http.post<any>(this.baseurl + '/posts/', postData);
    }

    getUserObservableByURL(full_url): Observable<any> {
        this.response_object = this.http.get(full_url, { headers: this.httpHeaders });
        //console.log(this.response_object)
        return this.response_object;
    }

    constructPostList() {
        this.getAllPosts().subscribe(
            data => {
              console.log(data);
                console.log("Yinuod constructPostList invoked");
                for (let entry of data) {
                    let post = null;
                    let id = entry['id'];
                    let puser: User = null;
                    puser = new User("", "", "", this.imgTemp1);
                    this.getUserObservableByURL(entry['user']).subscribe(
                        user_data => {
                            puser.username = user_data['username']
                            puser.firstName = user_data['first_name'];
                            puser.lastName = user_data['last_name'];
                        }
                    );
                    let image_path = 'https://i.pinimg.com/280x280_RS/78/28/3c/78283c0ec328cd2a2ae06366a610dbbc.jpg';
                    if (entry['images'].length !== 0) {
                      console.log(entry['images'][0]['image']);
                      image_path = entry['images'][0]['image'];
                    }
                    let postDate = new Date(entry['date']);
                    let postText = entry['text'];
                    let postTitle = entry['title'];
                    let likes = entry['likes'];
                    let postComments: Comment[] = [];
                    for (let comment_data of entry['comments']) {
                        let comment_obj: Comment;
                        let c_user = new User("", "", "", "");
                        this.getUserObservableByURL(comment_data['user']).subscribe(
                            c_data => {
                                c_user.username = c_data['username']
                                c_user.firstName = c_data['first_name'];
                                c_user.lastName = c_data['last_name'];
                            }
                        );
                        let c_text = comment_data['text'];
                        comment_obj = new Comment(c_user, c_text);
                        postComments.push(comment_obj);
                    }
                    post = new Post(id, puser, image_path, postDate, postText, postTitle, postComments, likes, null);
                    this.post_list.push(post);
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    getPostById(post_id: number): Observable<any> {
        this.response_object = this.http.get(this.baseurl + '/posts/' + post_id + '/', { headers: this.httpHeaders })
        return this.response_object;
    }

    getPostUrlById(post_id: number){
        return this.baseurl + '/posts/' + post_id + '/';
    }

}
