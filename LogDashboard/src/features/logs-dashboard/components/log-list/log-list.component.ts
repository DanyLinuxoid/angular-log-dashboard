import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LogEntry } from '../../interfaces/log.interface';
import { LogEntryComponent } from '../log-entry/log-entry.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'log-list',
    templateUrl: './log-list.component.html',
    styleUrls: ['./log-list.component.css'],
    imports: [LogEntryComponent, NzLayoutModule, ScrollingModule],
})

export class LogListComponent {
  private uploadAmount: number = 5000;
  private uploadThreshold: number = 0.5;
  private checkLoadedAmounts = new Set<number>();

  @Input() logs!: BehaviorSubject<LogEntry[]>;
  @Input() shouldDisplayLogNames: boolean = true;
  @Input() recordsPerRow: number = 1;
  @Output() uploadMoreData = new EventEmitter<number>();

  trackByLogId = (_: number, log: LogEntry): number => log.id;

  checkForMoreData(index: number) {
    const threshold = Math.floor(this.logs.value.length * this.uploadThreshold);
    const nextAmount = this.logs.value.length + this.uploadAmount
    if (index >= threshold && !this.checkLoadedAmounts.has(nextAmount)) {
      this.checkLoadedAmounts.add(nextAmount);
      this.uploadMoreData.emit(nextAmount);
    }

    // If we should reset on re-filter
    if (this.checkLoadedAmounts.size > 0 && this.logs.value.length < Math.max(...this.checkLoadedAmounts)) 
      this.checkLoadedAmounts = new Set<number>();
  }
}
