import { Component, OnInit } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car, carAttributesMapping } from './car.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'electric-boogaloo';
  cars$: Observable<Car[]>;

  constructor(private googleSheetsDbService: GoogleSheetsDbService) { }
  
  ngOnInit(): void {
    this.cars$ = this.googleSheetsDbService.get<Car>(environment.cars.spreadsheetId, environment.cars.worksheetId, carAttributesMapping).pipe(
      map(cars => cars.filter(car => car.range > 200)),
      map(cars => cars.sort((car1, car2) => car1.range - car2.range)),
    );
  }
}
