import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-introduce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduce.component.html',
  styleUrl: './introduce.component.scss',
})
export class IntroduceComponent {
  constructor(private route: Router) {
  }
  onRegister(): void{
    this.route.navigate(['/landing-page']);
  }
}
