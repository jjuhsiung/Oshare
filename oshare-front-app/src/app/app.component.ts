import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'oshare-front-app';

  constructor(private facebookService: FacebookService, private router: Router) {}

  ngOnInit(): void {
    this.initFacebookService();
    this.router.events
      .subscribe((event) => {
        $(window).scrollTop(0);
      });
  }

  private initFacebookService(): void {
    const initParams: InitParams = { xfbml:true, version:'v3.2'};
    this.facebookService.init(initParams);
  }
}
