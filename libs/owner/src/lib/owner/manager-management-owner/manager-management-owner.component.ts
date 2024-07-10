import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerManagementContentComponent } from './manager-management-content/manager-management-content.component';

@Component({
  selector: 'lib-manager-management-owner',
  standalone: true,
  imports: [CommonModule, ManagerManagementContentComponent],
  templateUrl: './manager-management-owner.component.html',
  styleUrl: './manager-management-owner.component.scss',
})
export class ManagerManagementOwnerComponent {}
