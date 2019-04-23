import { Component, OnInit, ViewChild } from "@angular/core";
import { SocialactivityService } from "@app/services/socialactivity.service";
import { Socialactivity } from "@app/models/socialactivity";
import { FormsModule } from "@angular/forms";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatSelect
} from "@angular/material";
import { SocialTopic } from "@app/models/socialtopic";

/**
 * Component
 */
@Component({
  selector: "app-social-activity",
  templateUrl: "./social-activity.component.html",
  styleUrls: ["./social-activity.component.scss"]
})

/** Comment.... */
export class SocialActivityComponent implements OnInit {
  public title = "Social Activity";
  private socialActivities: Socialactivity[];
  socialTopics: SocialTopic[] = [
    {
      id: "1234",
      name: "test -1",
      topic: "test topic - 1"
    },
    {
      id: "5678",
      name: "test -2",
      topic: "test topic - 2"
    }
  ];
  socialActivityDataDource: MatTableDataSource<any>;
  displayedColumns: string[] = ["id", "source", "content", "actions"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedTopic: string;

  constructor(private socialActivityService: SocialactivityService) {}

  ngOnInit() {
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
        this.socialActivities = socialActivities;
        this.socialActivityDataDource = new MatTableDataSource(
          socialActivities
        );
        this.socialActivityDataDource.sort = this.sort;
        this.socialActivityDataDource.paginator = this.paginator;
      });
  }
}
