import { Injectable } from "@angular/core";
import { Socialactivity } from "@app/models/socialactivity";
import { TwitterResponse } from "@app/models/twitterresponse";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root"
})
export class TwitterService {
  constructor(private http: HttpClient) {}

  validateUser() {
    return this.http.get<TwitterResponse>(`${environment.api}/user`);
  }

  /**
   * Gets user friends ( user's following list)
   * @returns
   */
  getUserFriends() {
    return this.http.get<TwitterResponse>(`${environment.api}/userfriends`);
  }

  /**
   * Gets user tweets
   * @param userId
   * @returns list of user tweets
   */
  getUserTweets(userId) {
    return this.http.get<TwitterResponse>(
      `${environment.api}/usertweets?userId=${userId}`
    );
  }

  home(since?: string) {
    return this.http.get<TwitterResponse>(
      `${environment.api}/home?since=${since}`
    );
  }

  action(property: "favorite" | "retweet", id: string, state: boolean) {
    return this.http.post<TwitterResponse>(
      `${environment.api}/${property}/${id}`,
      { state }
    );
  }



  getHandlerTweets(twitterHandler: string) {
    return this.http.get<TwitterResponse>(
      `${environment.api}/handlertweets?q=${twitterHandler}`
    );
  }
}
