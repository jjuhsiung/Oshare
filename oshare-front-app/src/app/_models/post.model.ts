import { OComment } from '../shared/post-list/OComment.model';

export class Post {
    public imagePath: string;
    public postDate: Date;
    public likes: Number; 
    public postText: string; 
    public comments: OComment[]; 

    constructor(imagePath: string, postDate: Date, likes: Number, postText: string, comments: OComment[]) {
        this.imagePath = imagePath;
        this.postDate = postDate;
        this.likes = likes;
        this.postText = postText;
        this.comments = comments;
    }
}