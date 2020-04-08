import { PostImageService } from './../_services/post-image.service';
import { UserService } from './../_services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  providers: [PostService, UserService, PostImageService]
})
export class NewPostComponent implements OnInit {

  form;
  file: File[] = null;
  userURL: string;
  postURL: string;
  images = [];
  
  constructor(
    fb: FormBuilder,
    private router: Router, 
    private postService: PostService, 
    private userService: UserService,
    private postImageService: PostImageService) { 

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

  fileChanged(event){
    this.file = <File[]>event.target.files;
  }

  createPost(){
    this.userURL = this.userService.getUserURLById(localStorage.getItem('userId'));

    const formData = new FormData();
    formData.append('user', this.userURL);
    formData.append('title', this.form.get('title').value);
    formData.append('text', this.form.get('text').value);

    this.postService.createPosts(formData).subscribe(
      response => {
        this.postURL = response.url;
        //console.log(this.postURL);

        if(this.file!=null){

          for(var i=0; i<this.file.length; i++){
            const formData = new FormData();
            formData.append('image', this.file[i], this.file[i].name);
            formData.append('post', this.postURL);
            this.postImageService.uploadImage(formData).subscribe(
              response => {
                //console.log(response);
              },
              error =>{
                console.log(error);
              }
            );
          }

        }
        alert('Post successfully create!');
        this.router.navigate(['/search'])
      },
      
      error =>{
        console.log(error);
      }
    );



  }
}
