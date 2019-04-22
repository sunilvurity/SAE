import { Component, OnInit } from '@angular/core';
/**
 * Component
 */
@Component({
  selector: 'app-social-activity',
  templateUrl: './social-activity.component.html',
  styleUrls: ['./social-activity.component.sass']
})

/** Comment... */
export class SocialActivityComponent implements OnInit {

  public title = "Social Activity Experience";
  constructor() { }

  ngOnInit() {
  }

  public getTitle(){
    return this.title;
  }

}
