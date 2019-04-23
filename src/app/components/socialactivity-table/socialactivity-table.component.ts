import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { SocialactivityTableDataSource } from './socialactivity-table-datasource';

@Component({
  selector: 'app-socialactivity-table',
  templateUrl: './socialactivity-table.component.html',
  styleUrls: ['./socialactivity-table.component.css']
})
export class SocialactivityTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: SocialactivityTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new SocialactivityTableDataSource(this.paginator, this.sort);
  }
}
