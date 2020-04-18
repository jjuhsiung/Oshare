import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  firstname = "";
  lastname = "";
  typeList: string[] = ['Blush','Bronzer','Eyebrow','Eyeliner'];
  // typeList: string[] = ['Blush','Bronzer','Eyebrow','Eyeliner','Eyeshadow','Foundation','Lip liner','Lipstick','Mascara','Nail polish'];
  brandlist: string[] = ['almay', 'alva', 'anna sui', 'annabelle', 'benefit', 'boosh',
'burt\'s bees', 'butter london', 'c\'est moi', 'cargo cosmetics', 'china glaze', 'clinique',
'coastal classic creation', 'colourpop', 'covergirl', 'dalish', 'deciem', 'dior', 'dr. hauschka',
'e.l.f.', 'essie', 'fenty', 'glossier', 'green people', 'iman', 'l\'oreal', 'lotus cosmetics usa', 'maia\'s mineral galaxy',
'marcelle', 'marienatie', 'maybelline', 'milani', 'mineral fusion', 'misa', 'mistura', 'moov',
'nudus', 'nyx', 'orly', 'pacifica', 'penny lane organics', 'physicians formula', 'piggy paint',
'pure anada', 'rejuva minerals', 'revlon', 'sally b\'s skin yummies', 'salon perfect', 'sante',
'sinful colours', 'smashbox', 'stila', 'suncoat', 'w3llpeople', 'wet n wild', 'zorah',
'zorah biocosmetiques'];
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    if(this.checkLoginStatus()){
      this.userService.getUserObjectById(localStorage.getItem('userId')).subscribe(
        data =>{
          this.firstname = data.first_name;
          this.lastname = data.last_name;
        }, error=>{
          console.log(error);
        }
      );
    }
  }
  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');

    if (this.router.url === '/cart' || this.router.url === '/new-post') {
      this.router.navigate(['/search']);
      alert('Required login!');
    } else {
      location.reload();
    }
  }

  checkLoginStatus() {
    return localStorage.getItem('userToken') != null;
  }
}
