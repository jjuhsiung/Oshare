import { OComment } from '../shared/post-list/OComment.model';

export class Post {
    public postId: number;
    public userId: number;
    public imagePath: string;
    public postDate: Date;
    public likes: Number; 
    public postText: string; 
    public comments: OComment[]; 

    constructor(postId: number, userId:number, imagePath: string, postDate: Date, likes: Number, postText: string, comments: OComment[]) {
        this.postId = postId;
        this.userId = userId;
        this.imagePath = imagePath;
        this.postDate = postDate;
        this.likes = likes;
        this.postText = postText;
        this.comments = comments;
    }
}