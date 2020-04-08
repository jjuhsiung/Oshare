import { User } from './user.model';


export class Comment {
    user: User;
    commentText: string;
    commentTime: Date;
    constructor(user?: User, commentText?: string) {
        this.user = user;
        this.commentText = commentText;
        this.commentTime = new Date();
    }
}
