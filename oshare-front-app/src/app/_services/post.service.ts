import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Post } from '../_models/post.model';
import { OComment } from '../shared/post-list/OComment.model';

@Injectable()
export class PostService {
    postSelected = new EventEmitter<Post>();
    private posts: Post[] = [
        new Post('https://www.sephora.com/contentimages/homepage/032420/Homepage/DesktopMweb/2020-03-25-hp-slideshow-just-arrived-cyoa-us-m-slice.jpg', new Date(), 10, 'Great product',[
            new OComment('Meat'),
            new OComment('Fry')
        ]),
        new Post('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRypoA-W0a8tR_IRfJYZ9GKsUZpQq3oRaixOiJmL17bfRCd9LhY&usqp=CAU', new Date(), 10, 'Great product',[
            new OComment('Meat'),
            new OComment('Fry')
        ]),
        new Post('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSBXvM07h1srz5LoFdj6X6KdHbNWtMWxQfB86fhey9dFOHa2J_j&usqp=CAU', new Date(), 10, 'Great product',[
            new OComment('Meat'),
            new OComment('Fry')
        ]),
        new Post('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTw1zba_5WdZcjNEYmdLfMvVx4aZl8SnMo9rhaw5cIUhhdzEwIy&usqp=CAU', new Date(), 10, 'Great product',[
            new OComment('Meat'),
            new OComment('Fry')
        ]),
        new Post('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQYbyYIOu6Do-NapXLYCBEad6Dv0zQpMal98_m6qWVRf6cx-_hI&usqp=CAU', new Date(), 10, 'Great product',[
            new OComment('Meat'),
            new OComment('Fry')
        ]),
        new Post('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQul0fJTkoodxaJfQww1iQFCMXCD4YBnmZ7MvCysi4-trSqAoPb&usqp=CAU', new Date(), 10, 'Great product',[
            new OComment('Meat'),
            new OComment('Fry')
        ]),
    ];

    baseurl = "http://127.0.0.1:8000";
    httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

    constructor(private http: HttpClient) {

    };

    getAllPosts(): Observable<any>{
        return this.http.get(this.baseurl + '/posts/', {headers: this.httpHeaders})
    }

    getPosts() {
        return this.posts.slice();// get a copy
    }
}