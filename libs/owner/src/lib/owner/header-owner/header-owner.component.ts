import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';


@Component({
  selector: 'lib-header-owner',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, NgOptimizedImage, MatButton, MatIconButton, MatInput, MatMenuTrigger, MatMenu, MatMenuItem],
  templateUrl: './header-owner.component.html',
  styleUrl: './header-owner.component.scss',
})
export class HeaderOwnerComponent implements OnInit{

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  ToggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  constructor() {
    // constructor
  }

  ngOnInit(): void {
      console.log('HeaderOwnerComponent');
  }
  Profile() {
    // Profile
  }

  LogOut() {
    // LogOut
  }
}
