import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})

export class PostComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

}
