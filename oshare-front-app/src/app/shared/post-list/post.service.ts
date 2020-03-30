import { EventEmitter, Injectable } from '@angular/core';
import { Post } from './post.model';
import { OComment } from './OComment.model';

@Injectable()
export class PostService {
    postSelected = new EventEmitter<Post>();
    private posts: Post[] = [
        new Post('https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.826.620.suffix/1537973085542.jpeg', new Date(), 10, 'Great product',[
            new OComment('Meat'),
            new OComment('Fry')
        ]),
        new Post('https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/8/6/0/WU2301_Four-Cheese-Pepperoni-Pizzadilla_s4x3.jpg.rend.hgtvcom.826.620.suffix/1565115622965.jpeg', new Date(), 10, 'Great product',[
            new OComment('Meat'),
            new OComment('Fry')
        ])
    ];

    constructor() {};

    getPosts() {
        return this.posts.slice();// get a copy
    }
}