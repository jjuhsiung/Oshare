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
        return this.http.get(this.baseurl + '/posts/', { headers: this.httpHeaders })
    }

    getPosts() {
        return this.posts.slice();// get a copy
    }

    // add post(logged_in_user_id, post_content)

    // add comment to post(logged_in_user_id, target_post_id, comment_content)

    // update post_like(post_id, like_num)

    // load posts according to product(post的product list包含该product_id )

    // load posts according for search home page
    // What rules are we going to use?

    // load posts for logged in user(logged_in_user_id)
    
}