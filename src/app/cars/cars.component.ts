import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Car, carAttributesMapping } from '../car.model';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit, OnChanges {

  @Input() selectedRange : number;
  @Input() selectedCost : number;
  @Input() selectedSortOption : string;
  @Input() performanceDetails : boolean;
  
  cars$: Observable<Car[]>;

  constructor(private googleSheetsDbService: GoogleSheetsDbService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.cars$ = this.googleSheetsDbService.get<Car>(environment.cars.spreadsheetId, environment.cars.worksheetId, carAttributesMapping).pipe(
      map(cars => cars.filter(car => car.range >= this.selectedRange && car.cost >= this.selectedCost)),
      tap(cars => {
        switch(String(this.selectedSortOption)){
          case 'priceAsc':
            cars.sort((car1, car2) => car1.cost - car2.cost)
            break;
          case 'priceDesc':
            cars.sort((car1, car2) => car2.cost - car1.cost)
            break;
          case 'rangeAsc':
            cars.sort((car1, car2) => car1.range - car2.range)
            break;
          case 'rangeDesc':
            cars.sort((car1, car2) => car2.range - car1.range)
            break;
          default :
            cars.sort((car1, car2) => car1.cost - car2.cost)
            break;
         }
      }),
    );
  }

  ngOnInit(): void {
    this.cars$ = this.googleSheetsDbService.get<Car>(environment.cars.spreadsheetId, environment.cars.worksheetId, carAttributesMapping).pipe(
      tap(cars => cars.sort((car1, car2) => car1.range - car2.range)),
    );
  }

}
