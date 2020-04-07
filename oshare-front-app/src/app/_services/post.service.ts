import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Post } from '../_models/post.model';
import { Comment } from '../_models/comment.model';
import { User } from '../_models/user.model';
import { Product } from '../_models/product.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    imgProd = "https://i.ibb.co/C23xGSj/u221.png";
    imgTemp1 = 'https://upload.wikimedia.org/wikipedia/commons/5/59/That_Poppy_profile_picture.jpg'
    imgTemp = 'https://i.pinimg.com/280x280_RS/78/28/3c/78283c0ec328cd2a2ae06366a610dbbc.jpg'
    postSelected = new EventEmitter<Post>();
    response_object = null;
    private posts: Post[] = [
        new Post(1,
            new User('anns', 'Anna', 'Sue', this.imgTemp),
            'https://www.sephora.com/contentimages/homepage/032420/Homepage/DesktopMweb/2020-03-25-hp-slideshow-just-arrived-cyoa-us-m-slice.jpg',
            new Date(),
            'Components shouldnt fetch or save data directly and they certainly shouldnt knowingly present fake data. ' +
            'They should focus on presenting data and delegate data access to a service. In this tutorial, youll create a HeroService that all application classes can use to get heroes.' +
            ' Instead of creating that service with the new keyword, youll rely on Angular dependency injection to inject it into the HeroesComponent constructor. Services are a great way' +
            'to share information among classes that dont know each other',
            'Know your brushes',
            [new Comment(new User('anns', 'Anna', 'Sui', this.imgTemp1), 'Nice post, keep it up!'),
            new Comment(new User('anns', 'Bobby', 'Han', this.imgTemp1), 'I really like your content!'),
            ], 200,
            [new Product('brush', '5', 30, 'desc', this.imgProd, ''),
            new Product('Lipstick', '5', 30, 'desc', this.imgProd, '')]),
        new Post(2,
            new User('anns', 'Anna', 'Sue', this.imgTemp),
            'https://www.sephora.com/contentimages/homepage/032420/Homepage/DesktopMweb/2020-03-25-hp-slideshow-just-arrived-cyoa-us-m-slice.jpg',
            new Date(),
            'Components shouldnt fetch or save data directly and they certainly shouldnt knowingly present fake data. ' +
            'They should focus on presenting data and delegate data access to a service. In this tutorial, youll create a HeroService that all application classes can use to get heroes.',
            'New makeups',
            [new Comment(new User('anns', 'Anna', 'Sui', this.imgTemp1), 'Nice post, keep it up!'),
            new Comment(new User('anns', 'Bobby', 'Han', this.imgTemp1), 'I really like your content!'),
            ], 100, [new Product('lipbalm', '2', 120, 'desc', this.imgProd, '')])
    ];

    baseurl = "http://127.0.0.1:8000";
    httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

    constructor(private http: HttpClient) {
        console.log("post-service")

    };

    getAllPosts(): Observable<any> {
        this.response_object = this.http.get(this.baseurl + '/posts/', { headers: this.httpHeaders })
        return this.response_object
    }

    getPosts() {
        this.getAllPosts();
        //console.log(this.posts.slice());
        return this.posts.slice();// get a copy
    }

    getUserByURL(full_url): Observable<any> {
        this.response_object = this.http.get(full_url, { headers: this.httpHeaders })
        //console.log(this.response_object)
        return this.response_object
    }

    constructPostList() {
        let post_list: Post[] = [];
        this.getAllPosts().subscribe(
            data => {
                console.log("Yinuod constructPostList invoked");
                for (let entry of data) {
                    let post = null;
                    let id = entry['id'];
                    let puser: User = null;
                    puser = new User("","","","");
                    this.getUserByURL(entry['user']).subscribe(
                      user_data => {
                        // console.log(user_data); 
                        puser.username = user_data['username']
                        puser.firstName = user_data['first_name'];
                        puser.lastName = user_data['last_name'];
                        //puser = new User(user_data['username'], user_data['first_name'], user_data['last_name'], "");
                        console.log(puser);
                      }
                    );
                    //console.log(puser);
                    let postDate = new Date(entry['date']);
                    let postText = entry['text'];
                    let postTitle = "Dummy title";
                    let likes = entry['likes'];
                    let comments: Comment[] = [];
                    for (let comment_data in entry['comments']) {
                        let comment_obj: Comment;
                        let c_user: User;
                        this.getUserByURL(comment_data['user']).subscribe(
                            c_data => {
                                // console.log(c_data); 
                                c_user = new User(c_data['username'], c_data['first_name'], c_data['last_name'], "");
                                
                            }
                        );
                        let c_text = comment_data['text'];
                        comment_obj = new Comment(c_user, c_text);
                        
                        comments.push(comment_obj);
                    }
                    post = new Post(id, puser, "", postDate, postText, postTitle, comments, likes, null);
                    // console.log(post);
                    post_list.push(post);
                  }
            },
            error => {
              console.log(error);
            }
        )
        console.log(post_list);
        // this.posts = post_list;
    }

    // add post(logged_in_user_id, post_content)

    // add comment to post(logged_in_user_id, target_post_id, comment_content)

    // update post_like(post_id, like_num)

    // load posts according to product(post的product list包含该product_id )

    // load posts according for search home page
    // What rules are we going to use?

    // load posts for logged in user(logged_in_user_id)
    
}