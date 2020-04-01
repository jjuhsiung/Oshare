import { Comment } from './comment.model';
import { User } from './user.model';

export class Postdetail {
    public imagePath: string;
    public postDate: Date;
    public postText: string;
    public postTitle: string;
    public comments: Comment[];
    public user: User

    constructor(user: User, imagePath: string, postDate: Date, postText: string, postTitle: string, comments: Comment[]) {
        this.user = user;
        this.imagePath = imagePath;
        this.postDate = postDate;
        this.postText = postText;
        this.postTitle = postTitle;
        this.comments = comments;
    }
}
