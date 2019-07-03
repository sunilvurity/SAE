import { Injectable } from '@angular/core';
import { Socialactivity } from '@app/models/socialactivity';
import { FacebookResponse } from '@app/models/facebookresponse';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  constructor(private http: HttpClient) {}

  getHandlerPublicPosts(facebookPage: string) {
    return this.http.get<FacebookResponse>(
      `${environment.api}/getposts`
    );
  }

  postPagePostLikes(pagePostId: string) {
    return this.http.post<FacebookResponse>(
      `${environment.api}/like/${pagePostId}`,
      {}
    );
  }

  addPagePostComment(pagePostId: string, comment: string) {
    return this.http.post<FacebookResponse>(
      `${environment.api}/commentpost/${pagePostId}/${comment}`,
      {}
    );
  }

  getPagePostComments(pagePostId: string) {
    return this.http.get<FacebookResponse>(
      `${environment.api}/getcomments/${pagePostId}`
    );
  }
}
