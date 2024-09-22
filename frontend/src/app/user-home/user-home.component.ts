import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  signOut() {
    this.authService.signOut().subscribe(() => {
      this.router.navigate(['/home']);  
    });
  }
}

