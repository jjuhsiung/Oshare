import { PostImageService } from './../_services/post-image.service';
import { UserService } from './../_services/user.service';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { PostService } from '../_services/post.service';
import { ProductService } from '../_services/product.service';
import { ProductListService } from '../_services/product-list.service';
import { ProductQuery } from '../_models/ProductQuery';
import { Location } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  providers: [PostService, UserService, PostImageService, ProductService],
})
export class NewPostComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  imgTypeCheck:boolean = true;

  form;
  file: File[] = null;
  userURL: string;
  postURL: string;
  images = [];
  Products: Array<object> = [];
  Products_selected: Array<object> = [];

  pageNum = 1;
  pageSize = 4;
  MaxPageSize = 1;
  pagelist = [];

  textInput = '';
  brand = '';
  price = '';
  ProductType = '';
  query = new ProductQuery();
  to_result = true;
  brandlist: string[] = ['almay', 'alva', 'anna sui', 'annabelle', 'benefit', 'boosh',
'burt\'s bees', 'butter london', 'c\'est moi', 'cargo cosmetics', 'china glaze', 'clinique',
'coastal classic creation', 'colourpop', 'covergirl', 'dalish', 'deciem', 'dior', 'dr. hauschka',
'e.l.f.', 'essie', 'fenty', 'glossier', 'green people', 'iman', 'l\'oreal', 'lotus cosmetics usa', 'maia\'s mineral galaxy',
'marcelle', 'marienatie', 'maybelline', 'milani', 'mineral fusion', 'misa', 'mistura', 'moov',
'nudus', 'nyx', 'orly', 'pacifica', 'penny lane organics', 'physicians formula', 'piggy paint',
'pure anada', 'rejuva minerals', 'revlon', 'sally b\'s skin yummies', 'salon perfect', 'sante',
'sinful colours', 'smashbox', 'stila', 'suncoat', 'w3llpeople', 'wet n wild', 'zorah',
'zorah biocosmetiques'];

  checked_status: boolean[] = [];
  productName = new FormControl('');

  constructor(
    fb: FormBuilder,
    private router: Router,
    private postService: PostService,
    private userService: UserService,
    private productService: ProductService,
    private productListService: ProductListService,
    private postImageService: PostImageService) {

    this.form = fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      text: ['', [Validators.required, Validators.maxLength(5000)]],
      upload: ['', Validators.required]
    });

    console.log("init new post page");
    this.productService.productsupdate.subscribe(data => {
      this.Products = data['response'];
      this.checked_status.length = 0;
      let max_product_id = 0;
      for (let i=0; i<this.Products.length;i++){
        max_product_id = Math.max(max_product_id, this.Products[i]['id']);
      }
      for (let i=0; i<max_product_id; i++) {
        this.checked_status.push(false);
      }
      console.log(this.Products);
      this.MaxPageSize = this.Products.length/this.pageSize + 1;
      this.pagelist = [];
      for (let i=0;i<this.MaxPageSize-1;i++)
        this.pagelist.push(i);
      console.log(this.pagelist);
    });
  }

  get title(){
    return this.form.get('title');
  }

  get text(){
    return this.form.get('text');
  }

  get upload(){
    return this.form.get('upload');
  }

  ngOnInit(): void {

    if(localStorage.getItem('userToken') == null){
      alert('Required Login!');
      this.router.navigate(['/search'])
    }

  }

  PrePage(): void {
    if (this.pageNum>1)
      this.pageNum = this.pageNum -1;
  }

  NextPage(): void {
    if (this.pageNum < this.MaxPageSize - 1)
      this.pageNum = this.pageNum + 1;
  }

  ToPage(num): void {
    this.pageNum = num;
  }

  DoSearch(): void {
    // this.query = new ProductQuery();
    // console.log(this.brand);
    // console.log(this.input);
    this.query.ProductTags = '';
    this.query.ProductType = '';
    this.query.brand = '';
    this.query.ProductCategory = '';
    console.log(this.productName.value);
    this.query.input = this.productName.value;
    console.log(this.query);
    this.productService.getProductsInfo(this.query);
    this.to_result = false;
    if (location.pathname != '/new-post') {
      this.to_result = true;
    }
    console.log('compare path name');
    console.log(this.to_result);
    if (this.to_result) {
      console.log('current url is /search');
      this.router.navigate(['/search-result'], {queryParams: this.query});
    } else if (location.pathname == '/new-post') {
      console.log('current url is /new-post');
    }
  }

  addToSelected(el, product_idx: number, list_idx: number) {
    if (this.checked_status[product_idx]) {
      console.log("Already selected, move out");
      let idx = -1;
      idx = this.Products_selected.map(function(e) {
        return e['id'];
      }).indexOf(product_idx);
      this.Products_selected.splice(idx, 1);

      el.checked = false;
      this.checked_status[product_idx] = false;
    } else {
      console.log("Have not selected yet, add in");
      this.Products_selected.push(this.Products[list_idx]);

      el.checked = true;
      this.checked_status[product_idx] = true;
    }

    console.log(this.Products_selected);
  }

  fileChanged(event){
    var files = <File[]>event.target.files;
    this.checkImgFileTypes(files);
  }

  checkImgFileTypes(files){
    this.imgTypeCheck = true;

    if(files !=null){
      for(var i=0; i<files.length; i++){
        if(!this.checkExtension(files[i].name)){
          this.imgTypeCheck = false;
          return;
        }
      }
      this.imgTypeCheck = true;
      this.file = files;
    }
  }

  checkExtension(filename) {
    let valToLower = filename.toLowerCase();
    let regex = new RegExp("(.*?)\.(jpg|png|jpeg)$"); //add or remove required extensions here
    return regex.test(valToLower);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  
  createPost(){

    if(!this.form.valid || !this.imgTypeCheck){
      this.validateAllFormFields(this.form);
      return;
    }
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
