import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'lib-overview-owner',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, MatIcon],
  templateUrl: './overview-owner.component.html',
  styleUrl: './overview-owner.component.scss',
})
export class OverviewOwnerComponent {}
