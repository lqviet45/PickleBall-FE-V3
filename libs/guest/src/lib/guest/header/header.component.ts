import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,  RouterLink} from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, MatToolbar, MatButton, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  activeButton = '';

  constructor(private router: Router) {}

  setActiveButton(button: string) {
    this.activeButton = button;
    this.scrollToSection(button);
  }
  scrollToSection(sectionId: string) {
    this.router.navigate([], { fragment: sectionId });
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  onLogin() {
    // Logic for login button click
    this.router.navigate(['login']);
  }
}
