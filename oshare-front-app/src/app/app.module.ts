import { PostImageService } from './_services/post-image.service';
import { UserService } from './_services/user.service';
import { NewPostComponent } from './new-post/new-post.component';
import { CheckoutService } from './_services/checkout.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { ProfileHeaderComponent } from './profile/profile-header/profile-header.component';
import { PostListComponent } from './shared/post-list/post-list.component';
import { ProductListComponent } from './shared/product-list/product-list.component';
import { ProductItemComponent } from './shared/product-list/product-item/product-item.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ReviewListComponent } from './product/review-list/review-list.component';
import { PostItemComponent } from './shared/post-list/post-item/post-item.component';
import { HomeSearchComponent } from './home-search/home-search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CartComponent } from './cart/cart.component';
import { ProductCountListComponent } from './cart/product-count-list/product-count-list.component';
import { ProductCountItemComponent } from './cart/product-count-item/product-count-item.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PostComponent } from './post/post-page.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { RegisterComponent } from './register/register.component';
import { CartService } from './_services/cart.service';
import { PostService } from './_services/post.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfilePostListComponent } from './profile/profile-post-list/profile-post-list.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'post-list', component: PostListComponent },
  { path: 'post-item', component: PostItemComponent },
  { path: 'search', component: HomeSearchComponent },
  { path: 'search-result', component: SearchResultComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new-post', component: NewPostComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    LoginComponent,
    ProfileComponent,
    ProductComponent,
    ProfileHeaderComponent,
    PostListComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailComponent,
    ReviewListComponent,
    PostItemComponent,
    HomeSearchComponent,
    SearchResultComponent,
    CartComponent,
    ProductCountListComponent,
    ProductCountItemComponent,
    CheckoutComponent,
    PostComponent,
    PostDetailComponent,
    RegisterComponent,
    NewPostComponent,
    ProfilePostListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CartService,
    CheckoutService,
    UserService,
    PostImageService,
    PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
