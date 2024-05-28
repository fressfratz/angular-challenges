import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      class="bg-light-red"
      [list]="cities"
      [listItem]="listItem"
      (addItem)="addCity()">
      <img src="assets/img/city.png" width="200px" />

      <ng-template #listItem let-city>
        <app-list-item
          [name]="city.name"
          (deleteItem)="deleteCity(city.id)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent, CommonModule],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));

    this.store.cities$.subscribe((cities) => (this.cities = cities));
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }

  addCity() {
    this.store.addOne(randomCity());
  }
}
