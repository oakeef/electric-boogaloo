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
  
  cars$: Observable<Car[]>;

  constructor(private googleSheetsDbService: GoogleSheetsDbService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.cars$ = this.googleSheetsDbService.get<Car>(environment.cars.spreadsheetId, environment.cars.worksheetId, carAttributesMapping).pipe(
      map(cars => cars.filter(car => car.range >= this.selectedRange && car.cost <= this.selectedCost)),
      tap(cars => {
        switch(String(this.selectedSortOption)){
          case 'priceAsc':
            console.log("DOG ASS");
            cars.sort((car1, car2) => car1.cost - car2.cost)
            break;
          case 'priceDesc':
            console.log("DOG DESK");
            cars.sort((car1, car2) => car2.cost - car1.cost)
            break;
          case 'rangeAsc':
            console.log("DOG ASS");
            cars.sort((car1, car2) => car1.range - car2.range)
            break;
          case 'rangeDesc':
            console.log("DOG DESK");
            cars.sort((car1, car2) => car2.range - car1.range)
            break;
         }
      }),
    );
  }

  ngOnInit(): void {
    this.selectedRange = 0;
    this.selectedCost = 0;
    this.cars$ = this.googleSheetsDbService.get<Car>(environment.cars.spreadsheetId, environment.cars.worksheetId, carAttributesMapping).pipe(
      tap(cars => cars.sort((car1, car2) => car1.range - car2.range)),
    );
  }

}
