import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { Post } from '../../Interfaces/Post';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardFooter,
    MatChipSet,
    MatChip,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  posts!: Post[];
  userId = localStorage.getItem("userId");
  protected _onDestroy = new Subject<void>();
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.populateFeed();
  }

  populateFeed() {
    const params = new HttpParams()
      .set('userId', this.userId || '' );
    this.apiService
      .getPostOfIndividual(params)
      .pipe(takeUntil(this._onDestroy))
      .subscribe({
        next: (res: any) => {
          this.posts = res;
          console.log(res);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }

  liked(post: Post) {
    post.likes = post.likes + 1;
    this.apiService
      .updateLike(post)
      .pipe(takeUntil(this._onDestroy))
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.populateFeed();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
  }
}