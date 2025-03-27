import { Component, Input } from '@angular/core';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'simple-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
  imports: [NzToolTipModule],
})

export class TooltipComponent {
  @Input() tooltipText!: string;
}
