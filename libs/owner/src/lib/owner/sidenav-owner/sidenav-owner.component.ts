import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'lib-sidenav-owner',
  standalone: true,
  imports: [CommonModule, MatNavList, NgOptimizedImage, MatListItem, MatIcon],
  templateUrl: './sidenav-owner.component.html',
  styleUrl: './sidenav-owner.component.scss',
})
export class SidenavOwnerComponent {

  @Output() currentView : EventEmitter<string> = new EventEmitter<string>();

  changeView(view: string) {
    this.currentView.emit(view);
  }

}
