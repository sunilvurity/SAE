import { Component, OnInit, ViewChild } from '@angular/core';
import { SocialactivityService } from '@app/services/socialactivity.service';
import { Socialactivity } from '@app/models/socialactivity';
import { FormsModule } from '@angular/forms';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatSelect,
  MatSnackBar,
} from '@angular/material';
import { SocialTopic } from '@app/models/socialtopic';

/**
 * Component
 */
@Component({
  selector: 'app-social-activity',
  templateUrl: './social-activity.component.html',
  styleUrls: ['./social-activity.component.scss']
})

/** Comment.... */
export class SocialActivityComponent implements OnInit {
  public title = 'Social Activity';
  private socialActivities: Socialactivity[];
  socialTopics: SocialTopic[] = [];
  socialActivityDataDource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'source', 'content', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedTopic: string;

  constructor(private socialActivityService: SocialactivityService , private snackBar: MatSnackBar ) {}

  ngOnInit() {
    this.setUpDataTable();
    this.socialActivityService.getUserFriends().subscribe(socialTopics => {
      this.socialTopics = socialTopics;
      console.log(this.socialTopics);
    });
  }

  /**
   * Determines whether topic select on
   * @param event
   */
  onTopicSelect(event) {
    const selectedTopicId = event.value;
    this.socialActivityService
      .getUserSocialActivity(selectedTopicId)
      .subscribe(socialActivities => {
        this.socialActivityDataDource.data = socialActivities;
      });
  }

  private setUpDataTable() {
    this.socialActivityDataDource = new MatTableDataSource(
      this.socialActivities
    );
    this.socialActivityDataDource.sort = this.sort;
    this.socialActivityDataDource.paginator = this.paginator;
  }

  /******************************************Events************************************************* */

  /**
   * On Like Click
   */
  onLikeClick(selectedRow) {
    console.log(selectedRow);
    this.socialActivityService.postSocialActivityAction(selectedRow.id, 'favorite').subscribe(isPosted => {
      console.log(isPosted);
      this.snackBar.open('tweet liked!', ' ', {
        duration: 2000,
      });
    });
  }

  /**
   * On retweet Click
   */
  onRetweetClick(selectedRow) {
    console.log(selectedRow);
    this.socialActivityService.postSocialActivityAction(selectedRow.id, 'retweet').subscribe(isPosted => {
      console.log(isPosted);
      this.snackBar.open('tweet retweetd!', ' ', {
        duration: 2000,
      });
    });
  }
}
