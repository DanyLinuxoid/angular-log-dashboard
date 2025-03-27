import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { Required } from '../../decorators/required.decorator';

export interface MenuItem {
  name: string;
  count: number;
}

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  imports: [
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    NzToolTipModule,
    CommonModule,
    NzLayoutModule],
})
export class SidebarComponent {
  @Input() @Required nzTitle!: string;
  @Input() menuItems: MenuItem[] = [];
  @Output() chosenMenuItemEvent = new EventEmitter<MenuItem>();

  getTitle(): string {
    return `${this.nzTitle} (${this.menuItems.length})`;
  }

  onMenuItemChoose(item: MenuItem): void {
    this.chosenMenuItemEvent.emit(item);
  }
}
