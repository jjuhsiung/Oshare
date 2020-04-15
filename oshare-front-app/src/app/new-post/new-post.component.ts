import { PostImageService } from './../_services/post-image.service';
import { UserService } from './../_services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../_services/post.service';
import { ProductService } from '../_services/product.service';
import { ProductListService } from '../_services/product-list.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  providers: [PostService, UserService, PostImageService, ProductService]
})
export class NewPostComponent implements OnInit {

  form;
  file: File[] = null;
  userURL: string;
  postURL: string;
  images = [];
  Products: Array<object> = [];
  Products_selected: Array<object> = [];

  constructor(
    fb: FormBuilder,
    private router: Router,
    private postService: PostService,
    private userService: UserService,
    private productService: ProductService,
    private productListService: ProductListService,
    private postImageService: PostImageService) {

    this.form = fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
    });

    console.log("init new post page");
    this.productService.productsupdate.subscribe(data => {

      this.Products = data['response'];
      console.log(this.Products);
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

  addToSelected(product_idx: number, list_idx: number) {
    var exist=this.Products_selected.some(function(item){
      return item['id'] === product_idx;
    });

    if (exist) {
      console.log("Already selected, move out");

      let idx = -1;
      idx = this.Products_selected.map(function(e) {
        return e['id'];
      }).indexOf(product_idx);
      this.Products_selected.splice(idx, 1);
    } else {
      console.log("Have not selected yet, add in");

      this.Products_selected.push(this.Products[list_idx])
    }

    console.log(this.Products_selected);
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
        console.log("create post invoked");
        console.log(this.Products);
        this.postURL = response.url;
        console.log(this.postURL);

        // add product to post
        this.postService.updatePostProduct(this.postURL, this.Products_selected).subscribe(data => {
          console.log("Adding related product to post");
        })
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

  // TODO: add a dropdown to add related product selectively
  //       should be able to add several product at the same time
}
