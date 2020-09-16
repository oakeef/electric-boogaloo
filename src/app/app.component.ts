import { Component, OnInit } from '@angular/core';
import { GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable } from 'rxjs';
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
    this.cars$ = this.googleSheetsDbService.get<Car>(
      environment.cars.spreadsheetId, environment.cars.worksheetId, carAttributesMapping);
  }
}
