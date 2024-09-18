import { Post } from './../../Interfaces/Post';
import { Component, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { ApiService } from '../../services/api.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-feed',
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
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  posts!: Post[];
  protected _onDestroy = new Subject<void>();
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.populateFeed();
  }

  populateFeed() {
    this.apiService
      .getPosts()
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
