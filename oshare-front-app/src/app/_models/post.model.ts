import { Comment } from './comment.model';
import { User } from './user.model';
import { Product } from './product.model';

export class Post {
    public postId: Number;
    public user: User;
    public imagePath: string;
    public postDate: Date;
    public postText: string;
    public postTitle: string;
    public comments: Comment[];
    public likes: number;
    public relatedProducts: Product[]

    constructor(postId: Number, user: User, imagePath: string, postDate: Date,
        postText: string, postTitle: string, comments: Comment[], likes: number, relatedProducts: Product[]) {
        this.postId = postId;
        this.user = user;
        this.imagePath = imagePath;
        this.postDate = postDate;
        this.postText = postText;
        this.postTitle = postTitle;
        this.comments = comments;
        this.likes = likes;
        this.relatedProducts = relatedProducts;
    }
}
