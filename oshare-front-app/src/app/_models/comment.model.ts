import { first } from 'rxjs/operators';

export class Comment {
    username: string;
    firstName: string;
    lastName: string;
    commentText: string;
    commentTime: Date;
    constructor(username: string, firstName: string, lastName: string, commentText: string) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.commentText = commentText;
        this.commentTime = new Date();
    }
}
