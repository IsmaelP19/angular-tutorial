import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
  <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
  <!-- always add components this way -->
    <!-- the reason we add [housingLocation] is to bind the housingLocation object we have on the export class to the input declared on the HousingLocationComponent class -->
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  filteredLocationList: HousingLocation[] = [];

  housingLocationList: HousingLocation[] = [];

  housingService : HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations()
      .then(
        (housingLocationList: HousingLocation[]) => {
          this.housingLocationList = housingLocationList;
          this.filteredLocationList = housingLocationList;
        }
      );
  }

  // if we use a function on the template we must declare it on the component class
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    } else {
      this.filteredLocationList = this.housingLocationList.filter(
        housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
      );
    }
  

  }


}
