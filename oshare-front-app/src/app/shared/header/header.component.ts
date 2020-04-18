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
