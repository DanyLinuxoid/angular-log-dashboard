import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LogEntry } from '@features/logs-dashboard/interfaces/log.interface';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [FormsModule, NzButtonModule, NzInputModule, NzIconModule, TooltipComponent],
})

export class SearchComponent {
  @Input() logs!: LogEntry[];
  @Input() placeholder!: string;
  @Output() searchChangeEvent = new EventEmitter<string>();

  onSearch(text: string): void {
    this.searchChangeEvent.emit(text);
  }
}
