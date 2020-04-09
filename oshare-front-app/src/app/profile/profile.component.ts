import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { Post } from '../_models/post.model';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService]
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}


