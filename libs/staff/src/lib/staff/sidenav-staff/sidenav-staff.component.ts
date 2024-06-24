import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';

@Component({
  selector: 'lib-sidenav-staff',
  standalone: true,
  imports: [CommonModule,
    MatIcon,
    MatListItem,
    MatNavList,
    NgOptimizedImage
  ],
  templateUrl: './sidenav-staff.component.html',
  styleUrl: './sidenav-staff.component.scss',
})
export class SidenavStaffComponent {
  @Output() currentView : EventEmitter<string> = new EventEmitter<string>();

  changeView(view: string) {
    this.currentView.emit(view);
  }
}
