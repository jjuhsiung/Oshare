import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  firstname = "";
  lastname = "";
  showModal: boolean;

  //login
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  message: any = "";

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) { }
  // typeList: string[] = ['Blush', 'Bronzer', 'Eyebrow', 'Eyeliner'];
  typeList: Array<object> = [{name: 'Blush', category: ['Powder', 'Cream']},
    {name: 'Bronzer', category: ['Powder']},
    {name: 'Eyebrow', category: ['Pencil']},
    {name: 'Eyeliner', category: ['Liquid', 'Pencil', 'Gel', 'Cream']},
    {name: 'Eyeshadow', category: ['Palette', 'Pencil', 'Cream']}, // TODO: blank field
    {name: 'Foundation', category: ['Liquid', 'Contour', 'Bb cc', 'Concealer', 'Cream', 'Mineral', 'Powder', 'Highlighter']},
    {name: 'Lip liner', category: ['Pencil']},
    {name: 'Lipstick', category: ['Lipstick', 'Lip gloss', 'Liquid', 'Lip stain']},
    {name: 'Mascara', category: ['']},
    {name: 'Nail polish', category: ['']}];
  brandlist: string[] = ['almay', 'alva', 'anna sui', 'annabelle', 'benefit', 'boosh',
    'burt\'s bees', 'butter london', 'c\'est moi', 'cargo cosmetics', 'china glaze', 'clinique',
    'coastal classic creation', 'colourpop', 'covergirl', 'dalish', 'deciem', 'dior', 'dr. hauschka',
    'e.l.f.', 'essie', 'fenty', 'glossier', 'green people', 'iman', 'l\'oreal', 'lotus cosmetics usa', 'maia\'s mineral galaxy',
    'marcelle', 'marienatie', 'maybelline', 'milani', 'mineral fusion', 'misa', 'mistura', 'moov',
    'nudus', 'nyx', 'orly', 'pacifica', 'penny lane organics', 'physicians formula', 'piggy paint',
    'pure anada', 'rejuva minerals', 'revlon', 'sally b\'s skin yummies', 'salon perfect', 'sante',
    'sinful colours', 'smashbox', 'stila', 'suncoat', 'w3llpeople', 'wet n wild', 'zorah',
    'zorah biocosmetiques'];

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.checkLoginStatus()) {
      this.userService.getUserObjectById(localStorage.getItem('userId')).subscribe(
        data => {
          this.firstname = data.first_name;
          this.lastname = data.last_name;
        }, error => {
          console.log(error);
        }
      );
    }
  }

  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');

    if (this.router.url === '/cart' || this.router.url === '/new-post') {
      alert('Required login!');
      this.router.navigate(['/search']);
    } else {
      location.reload();
    }
  }

  get f() { return this.loginForm.controls; }

  checkLoginStatus() {
    return localStorage.getItem('userToken') != null;
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }
  onLogin() {
    let formObj = this.loginForm.getRawValue();
    if (this.loginForm.invalid) {
      this.message = 'Username or Password required!'
      this.loginForm.reset()
      return;
    }
    this.userService.loginUser(formObj).subscribe(
      response => {
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userId', response.id);
        alert('Logged in successfully!');
        this.router.navigate(['/search']);
      },
      error => {
        console.log(error);
        this.message = 'Wrong username or password!'
        this.loginForm.reset()
      }
    );
  }
}









