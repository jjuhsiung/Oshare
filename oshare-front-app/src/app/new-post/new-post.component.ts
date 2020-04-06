import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  form;
  constructor(fb: FormBuilder, private router: Router) { 
    this.form = fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  get title(){
    return this.form.get('title');
  }

  get text(){
    return this.form.get('text');
  }

  ngOnInit(): void {
    if(localStorage.getItem('userToken') == null){
      alert('Required Login!');
      this.router.navigate(['/search'])
    }
  }

  createPost(){

  }
}
