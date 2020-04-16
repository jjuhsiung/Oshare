export class User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImg: string;

    constructor(username?: string, firstName?: string, lastName?: string, profileImg?: string, email?: string) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImg = profileImg;
        this.email = email;
    }
}
