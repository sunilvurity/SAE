import { Component, OnInit } from '@angular/core';
import { SocialactivityService } from '@app/services/socialactivity.service';
import { Socialactivity } from '@app/models/socialactivity';
/**
 * Component
 */
@Component({
  selector: 'app-social-activity',
  templateUrl: './social-activity.component.html',
  styleUrls: ['./social-activity.component.sass']
})

/** Comment.... */
export class SocialActivityComponent implements OnInit {

  public title = 'Social Activity';
  private socialActivities: Socialactivity[];
  constructor(private socialActivityService: SocialactivityService) { }

  ngOnInit() {
    this.socialActivityService.getHandlerSocialActivity('nasa').subscribe(socialActivities => {
      this.socialActivities = socialActivities;
    });
  }

  public getTitle() {
    return this.title;
  }

}
