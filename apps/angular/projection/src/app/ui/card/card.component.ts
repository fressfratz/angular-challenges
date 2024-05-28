import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="bg-color flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content></ng-content>
      <section>
        <ng-container *ngFor="let item of list">
          <ng-template
            *ngTemplateOutlet="
              listItem;
              context: { $implicit: item }
            "></ng-template>
        </ng-container>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  styles: [
    `
      :host-context(.bg-light-red) .bg-color {
        background-color: rgba(250, 0, 0, 0.1);
      }
      :host-context(.bg-light-green) .bg-color {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [NgFor, ListItemComponent, CommonModule],
})
export class CardComponent {
  @Input() list: unknown[] | null = null;
  @Input() customClass = '';
  @Output() addItem = new EventEmitter<void>();

  @Input()
  listItem!: TemplateRef<unknown>;

  addNewItem() {
    this.addItem.emit();
  }
}
