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
  file: File = null;
  userURL: string;

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
    this.file = <File>event.target.files[0];
  }

  createPost(){
    this.form.getRawValue();
    this.userURL = this.userService.getUserURLById(localStorage.getItem('userId'));

    var postData = {
      'user': this.userURL,
      'title': this.form.get('title').value,
      'text': this.form.get('text').value,
      'images': [],
      'comments': []
    }
    var postURL;

    this.postService.createPosts(postData).subscribe(
      response => {
        postURL = response.url;
        alert('create post!');
      },
      error =>{
        console.log(error);
      }
    );

    // if(this.file!=null){
    //   // console.log(this.file);
    //   const formData = new FormData();
    //   formData.append('image', this.file, this.file.name);
    //   formData.append('post', postURL);
    //   this.postImageService.uploadImage(formData).subscribe(
    //     response => {
    //       console.log(response);
    //       alert('File successfully upload!');
    //     },
    //     error =>{
    //       console.log(error);
    //     }
    //   );
    // }

  }
}
