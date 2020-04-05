import { Comment } from './comment.model';
import { User } from './user.model';

export class Post {
    public postId: Number;
    public user: User;
    public postImage: string;
    public postDate: Date;
    public postText: string;
    public postTitle: string;
    public comments: Comment[];
    public likes: Number;

    constructor(postId: Number, user: User, postImage: string, postDate: Date,
        postText: string, postTitle: string, comments: Comment[], likes: Number) {
        this.postId = postId;
        this.user = user;
        this.postImage = postImage;
        this.postDate = postDate;
        this.postText = postText;
        this.postTitle = postTitle;
        this.comments = comments;
        this.likes = likes;
    }
}