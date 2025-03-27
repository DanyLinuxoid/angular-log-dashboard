import { Component, Input } from '@angular/core';
import { LogEntry } from '../../interfaces/log.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'log-entry',
  templateUrl: './log-entry.component.html',
  styleUrls: ['./log-entry.component.css'],
  imports: [CommonModule, NzCardModule, TooltipComponent, NzLayoutModule, NzIconModule],
  providers: [DatePipe],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ transform: 'scaleY(0)', opacity: 0, height: 0, overflow: 'hidden' }),
        animate('100ms ease-out', style({ transform: 'scaleY(1)', opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ transform: 'scaleY(0)', opacity: 0, height: 0, overflow: 'hidden' }))
      ])
    ])
  ]})

export class LogEntryComponent {
  @Input() log!: LogEntry;
  @Input() shouldDisplayLogName: boolean = true;

  constructor(public datepipe: DatePipe) { }

  onContentPin(): void {
    this.log.isContentPinned = !this.log.isContentPinned;
  }

  onMouseMove(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const threshold = target.clientWidth * 0.5;

    if (event.offsetX >= threshold) {
      this.onContentShow();
    } else {
      this.onContentHide();
    }
  }

  onContentShow(): void {
    this.log.isContentShown = true;
  }

  onContentHide(): void {
    this.log.isContentShown = false;
  }
}
