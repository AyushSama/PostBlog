import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  userName!:any;
  ngOnInit(): void {
      this.userName = localStorage.getItem("userName");
      console.log(this.userName);
  }
}
