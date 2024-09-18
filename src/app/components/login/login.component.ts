import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ApiService } from './../../services/api.service';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';
import { RedirectCommand, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Output() isLoggedIn = new EventEmitter<boolean>();

  constructor(private apiService : ApiService, private router:Router){}
  protected _onDestroy = new Subject<void>();

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
 
  userName: string = '';
  password: string = '';
  errorMessage: string = ''; 

  login(){
    console.log(this.userName);
    console.log(this.password);
    const params = new HttpParams()
      .set('username', this.userName)
      .set('password', this.password);
    this.apiService.getUser(params)
    .pipe(takeUntil(this._onDestroy))
    .subscribe({
      next: (res: any) => {
        if(res.userId){
          this.isLoggedIn.emit(true);
          localStorage.setItem("userId", res.userId);
          this.router.navigate(['/feed']);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }
}