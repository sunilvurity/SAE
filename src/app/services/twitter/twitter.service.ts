import { Injectable } from '@angular/core';
import { Socialactivity } from '@app/models/socialactivity';
import { TwitterResponse } from '@app/models/twitterresponse';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  constructor(private http: HttpClient) {}

  validateUser() {
    return this.http.get<TwitterResponse>(`${environment.api}/user`);
  }

  home(since?: string) {
    return this.http.get<TwitterResponse>(
      `${environment.api}/home?since=${since}`
    );
  }

  getUserTweets() {
    return this.http.get<TwitterResponse>(`${environment.api}/usertweets`);
  }

  getHandlerTweets(twitterHandler: string) {
    return this.http.get<TwitterResponse>(`${environment.api}/handlertweets?q=${twitterHandler}`);
  }

  action(property: 'favorite' | 'retweet', id: string, state: boolean) {
    return this.http.post<TwitterResponse>(
      `${environment.api}/${property}/${id}`,
      { state }
    );
  }
}
