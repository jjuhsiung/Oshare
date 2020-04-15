export class Profile {
    phone: string;
    address: string;
    profile_picture: string;

    constructor(phone: string, address: string, profile_picture: string) {
        this.phone = phone;
        this.address = address;
        this.profile_picture = profile_picture;
    }
}
