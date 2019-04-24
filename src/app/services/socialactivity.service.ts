import { Injectable } from '@angular/core';
import { TwitterService } from './twitter/twitter.service';
import { Socialactivity } from '@app/models/socialactivity';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocialTopic } from '@app/models/socialtopic';
/**
 * Injectable
 */
@Injectable({
  providedIn: 'root'
})

/**
 *  Social Activity Service
 */
export class SocialactivityService {
  user;
  constructor(private twitter: TwitterService) {
    this.twitter.validateUser().subscribe(user => {
      this.user = user.data;
      console.log(this.user);
    });
  }

  /**
   * get user tweets
   */
  getUserSocialActivity(userId): Observable<Socialactivity[]> {
    let socialActivities: Socialactivity[] = [];
    return this.twitter.getUserTweets(userId).pipe(
      map(userTweets => {
        socialActivities = this.getSocialActivitiesFromTweets(userTweets.data);
        console.log(socialActivities);
        return socialActivities;
      })
    );
  }

  /**
   * Get all user's following list
   */
  getUserFriends(): Observable<SocialTopic[]> {
    // tslint:disable-next-line: prefer-const
    let socialTopics: SocialTopic[];

    return this.twitter.getUserFriends().pipe(
      map(handles => {
        console.log(handles.data);
        socialTopics = this.getSocialTopicsFromUserFriends(handles.data);
        console.log(socialTopics);
        return socialTopics;
      })
    );
  }

  /**
   * get a specific social topic responses
   */
  getHandlerSocialActivity(
    twitterHanlde: string
  ): Observable<Socialactivity[]> {
    // tslint:disable-next-line: prefer-const
    let socialActivities: Socialactivity[];

    return this.twitter.getHandlerTweets(twitterHanlde).pipe(
      map(handlerTweets => {
        console.log(handlerTweets.data);
        socialActivities = this.getSocialActivitiesFromTweets(
          handlerTweets.data
        );
        console.log(socialActivities);
        return socialActivities;
      })
    );
  }

  /**
   * posts social activity action , like/retweet
   */
  postSocialActivityAction(socialActivityId, action): Observable<boolean> {
    // tslint:disable-next-line: prefer-const
    let socialActivities: Socialactivity[];

    return this.twitter.postTweetAction(action , socialActivityId, true).pipe(
      map(handlerTweets => {
        console.log('action posted');
        return true;
      })
    );
  }

  private getSocialActivitiesFromTweets(tweets: any): Socialactivity[] {
    // tslint:disable-next-line: prefer-const
    let socialActivities: Socialactivity[] = [];

    tweets.reverse().forEach(tweet => {
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

  private getSocialTopicsFromUserFriends(userFriends: any): SocialTopic[] {
    // tslint:disable-next-line: prefer-const
    let socialTopics: SocialTopic[] = [];

    userFriends.users.forEach(userFriend => {
      if (
        userFriend.name.includes('Microsoft') ||
        userFriend.screen_name.includes('Microsoft')
      ) {
        const socialTopic: SocialTopic = {
          id: userFriend.id_str,
          name: userFriend.name,
          topic: userFriend.screen_name
        };
        socialTopics.push(socialTopic);
      }
    });
    return socialTopics;
  }
}
