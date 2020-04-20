import {Review} from './_models/review.model';

// export const baseurl = "http://127.0.0.1:8000";
export const baseurl = 'https://ec2-54-153-122-82.us-west-1.compute.amazonaws.com';
export const REVIEWS: Review[] = [
  {
    UserImage: '',
    Username: 'fakeUser1',
    Rate: '★★★★☆',
    Comment: 'fake comment 1 (Bite Me) add more length',
  },
  {
    UserImage: '',
    Username: 'fakeUser2',
    Rate: '★★★☆',
    Comment: 'fake comment 2 (Bite Me)',
  },
  {
    UserImage: '',
    Username: 'fakeUser3',
    Rate: '★★★★',
    Comment: 'fake comment 3 (Bite Me)',
  },
];
