import { Injectable } from '@angular/core';
import { TwitterService } from './twitter/twitter.service';
import { Socialactivity } from '@app/models/socialactivity';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocialactivityService {
  user;
  constructor(private twitter: TwitterService) {
    this.twitter.validateUser().subscribe(user => {
      this.user = user.data;
      console.log(this.user);
    });
  }

  getUserSocialActivity(): Observable<Socialactivity[]> {
    this.twitter.getUserTweets().subscribe(user => {
      console.log(user.data);
    });
    return of(null);
  }

  getHandlerSocialActivity(
    twitterHanlde: string
  ): Observable<Socialactivity[]> {
    // tslint:disable-next-line: prefer-const
    let socialActivities: Socialactivity[];

    return this.twitter.getHandlerTweets(twitterHanlde).pipe(
      map(handlerTweets => {
        console.log(handlerTweets.data);
        socialActivities = this.getSocialActivitiesFromTweets(handlerTweets.data);
        console.log(socialActivities);
        return socialActivities;
      })
    );

  }

  private getSocialActivitiesFromTweets(tweets: any): Socialactivity[] {
    // tslint:disable-next-line: prefer-const
    let socialActivities: Socialactivity[] = [];

    tweets.statuses.reverse().forEach(tweet => {
      const socialActivity: Socialactivity = {
        id: tweet.id_str,
        content: tweet.full_text,
        source: 'Twitter',
        createdOn: new Date(tweet.created_at)
      };
      socialActivities.push(socialActivity);
    });
    return socialActivities;
  }
}
