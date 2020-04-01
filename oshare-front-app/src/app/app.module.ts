import { CheckoutService } from './services/checkout.service';
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
import { ReviewItemComponent } from './product/review-list/review-item/review-item.component';
import { PostItemComponent } from './shared/post-list/post-item/post-item.component';
import { HomeSearchComponent } from './home-search/home-search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CartComponent } from './cart/cart.component';
import { ProductCountListComponent } from './cart/product-count-list/product-count-list.component';
import { ProductCountItemComponent } from './cart/product-count-item/product-count-item.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PostComponent } from './post/post-page.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { RegisterComponent } from './register/register.component';
import { CartService } from './services/cart.service';
import { PostService } from './shared/post-list/post.service';


const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'post-list', component: PostListComponent},
  {path: 'post-item', component: PostItemComponent},
  {path: 'search', component: HomeSearchComponent},
  {path: 'search-result', component: SearchResultComponent},
  {path: 'post', component: PostComponent},
  {path: 'product', component: ProductComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'register', component: RegisterComponent},
]

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
    ReviewItemComponent,
    PostItemComponent,
    HomeSearchComponent,
    SearchResultComponent,
    CartComponent,
    ProductCountListComponent,
    ProductCountItemComponent,
    CheckoutComponent,
    PostComponent,
    PostDetailComponent,
    NavigationBarComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
    CartService,
    CheckoutService,
    PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
