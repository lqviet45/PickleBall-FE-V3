import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';

@Component({
  selector: 'lib-sidenav-admin',
  standalone: true,
  imports: [CommonModule, MatIcon, MatListItem, MatNavList, NgOptimizedImage],
  templateUrl: './sidenav-admin.component.html',
  styleUrl: './sidenav-admin.component.scss',
})
export class SidenavAdminComponent {
  @Output() currentView : EventEmitter<string> = new EventEmitter<string>();

  changeView(view: string) {
    this.currentView.emit(view);
  }
}
