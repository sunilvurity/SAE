import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocialActivityComponent } from './components/social-activity/social-activity.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocialactivityTableComponent } from './components/socialactivity-table/socialactivity-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    SocialActivityComponent,
    SocialactivityTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
