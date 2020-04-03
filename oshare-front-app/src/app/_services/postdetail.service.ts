import { Injectable } from '@angular/core';
import { Postdetail } from '../_models/postdetail.model';
import { Comment } from '../_models/comment.model';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PostdetailService {


  private post: Postdetail =
    new Postdetail(
      new User('anns', 'Anna', 'Sue', 'https://i.pinimg.com/280x280_RS/78/28/3c/78283c0ec328cd2a2ae06366a610dbbc.jpg'),
      'https://www.sephora.com/contentimages/homepage/032420/Homepage/DesktopMweb/2020-03-25-hp-slideshow-just-arrived-cyoa-us-m-slice.jpg',
      new Date(),
      'Components shouldnt fetch or save data directly and they certainly shouldnt knowingly present fake data. ' +
      'They should focus on presenting data and delegate data access to a service. In this tutorial, youll create a HeroService that all application classes can use to get heroes.' +
      ' Instead of creating that service with the new keyword, youll rely on Angular dependency injection to inject it into the HeroesComponent constructor. Services are a great way' +
      'to share information among classes that dont know each other',
      'Know your brushes',
      [new Comment('anns', 'Anna', 'Sui', 'Nice post, keep it up!'),
      new Comment('anns', 'Bobby', 'Han', 'I really like your content!'),
      ]);
  constructor() { }

  getPost() {
    return this.post;
  }
  getComments() {
    return this.post.comments;
    //return [new Comment('anns', 'Anna', 'Sui', 'Nice post'), new Comment('anns', 'Anna', 'Sui', 'Nice post')]
  }


}
