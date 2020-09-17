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
export class CarsComponent implements OnInit {
  private range: number;

  @Input() set selectedRange(value: number) {
      this.range = value;     
  };

  get selectedRange(): number {
      return this.range;
      
  }
  cars$: Observable<Car[]>;

  constructor(private googleSheetsDbService: GoogleSheetsDbService) { }

  ngOnInit(): void {
    this.cars$ = this.googleSheetsDbService.get<Car>(environment.cars.spreadsheetId, environment.cars.worksheetId, carAttributesMapping).pipe(
      map(cars => cars.filter(car => car.range >= this.range)),
      tap(cars => cars.sort((car1, car2) => car1.range - car2.range)),
    );
  }

}
