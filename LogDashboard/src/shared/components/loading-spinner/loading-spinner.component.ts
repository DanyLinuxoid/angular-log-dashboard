import { Component, Input } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'loading-spinner',
  imports: [
    NzSpinModule
  ],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {
  @Input() size: NzSizeLDSType = 'small';
}
