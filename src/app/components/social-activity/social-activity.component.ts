import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SocialactivityService } from '@app/services/socialactivity.service';
import { Socialactivity } from '@app/models/socialactivity';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SocialTopic } from '@app/models/socialtopic';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentDialog } from '@app/components/comment-dialog/comment-dialog.component'

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
  private socialTopics: SocialTopic[];
  socialActivityDataDource: MatTableDataSource<any>;
  displayedColumns: string[] = ['source', 'content', 'comment','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private socialActivityService: SocialactivityService, public dialog: MatDialog) {}

  content: string = "testcontent";
  id: string = "testid";

  openDialog(selectedRow): void {
    const dialogRef = this.dialog.open(CommentDialog, {
      width: '450px',
      data: {id: "testid", content: this.content}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.content = result;
      console.log(this.content);
      this.socialActivityService.addPagePostCommentsFB(selectedRow.id, this.content).subscribe();
    });
  }

  ngOnInit() {
    this.socialActivityService
      .getHandlerSocialActivityFB('Microsoft')
      .subscribe(socialActivities => {
        this.socialActivities = socialActivities;
        this.socialActivityDataDource = new MatTableDataSource(
          socialActivities
        );
        this.socialActivityDataDource.sort = this.sort;
        this.socialActivityDataDource.paginator = this.paginator;
        
        this.socialActivities.forEach( soicalActivity => {
          this.socialActivityService.getPagePostCommentsFB(soicalActivity.id).subscribe(comments => {
            console.log("test" + comments.length);
            soicalActivity.comments = comments;
          });
        }
        
        );
      });

    // this.socialActivityService
    //   .getSocialTopics()
    //   .subscribe(socialTopics => {
    //     this.socialTopics = socialTopics;
    //     console.log(this.socialTopics);
    //   });

  }

  onLikeClick(selectedRow) {
    console.log(selectedRow);
    this.socialActivityService.getPagePostCommentsFB(selectedRow.id).subscribe(isPosted => {
      console.log(isPosted);
    });
  }

  public getTitle() {
    return this.title;
  }
}
