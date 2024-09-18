import { Component , signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCheckbox } from '@angular/material/checkbox';
import { LoginComponent } from "./components/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, MatButtonToggleModule, MatCheckbox, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PostBlog';
  isLoggedIn = false;
  hideSingleSelectionIndicator = signal(false);

  
}
