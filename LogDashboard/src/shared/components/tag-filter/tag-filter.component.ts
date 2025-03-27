import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';

@Component({
  selector: 'tag-filter',
  imports: [FormsModule, NzSelectModule, CommonModule, NzButtonModule, NzIconModule, TooltipComponent],
  templateUrl: './tag-filter.component.html',
  styleUrl: './tag-filter.component.css'
})
export class TagFilterComponent {
  @Input() listOfTagOptions: string[] = [];
  @Input() placeholderText: string = 'Tags';
  @Input() chosenTagOptions: string[] = [];
  @Output() chosenTagOptionsChange = new EventEmitter<string[]>();

  onSelectionChange(selectedTags: string[]) {
    this.chosenTagOptions = selectedTags;
    this.chosenTagOptionsChange.emit(this.chosenTagOptions);
  }

  resetTags(): void {
    this.chosenTagOptions = [];
    this.chosenTagOptionsChange.emit(this.chosenTagOptions);
  }
}
