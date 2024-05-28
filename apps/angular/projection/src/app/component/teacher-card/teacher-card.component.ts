import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      class="bg-light-red"
      [list]="teachers"
      [listItem]="listItem"
      (addItem)="addTeacher()">
      <img src="assets/img/teacher.png" width="200px" />

      <ng-template #listItem let-teacher>
        <app-list-item
          [name]="teacher.firstName"
          (deleteItem)="deleteTeacher(teacher.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, CommonModule],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }
}
