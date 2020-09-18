import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'electric-boogaloo';
  performanceDetails = false;

  ranges:Array<Object> = [
    {value: 0, text: 'Any Range'},
    {value: 100, text: 'More than 100KM'},
    {value: 200, text: 'More than 200KM'},
    {value: 300, text: 'More than 300KM'},
  ];
  selectedRange: number;

  cost:Array<Object> = [
    {value: 0, text: 'Any'},
    {value: 10000, text: '$10,000+'},
    {value: 20000, text: '$20,000+'},
    {value: 30000, text: '$30,000+'},
    {value: 40000, text: '$40,000+'},
    {value: 50000, text: '$50,000+'},
    {value: 60000, text: '$60,000+'},
    {value: 70000, text: '$70,000+'},
    {value: 80000, text: '$80,000+'},
    {value: 90000, text: '$90,000+'},
  ];
  selectedCost: number;

  options:Array<Object> = [
    {value: 'priceAsc', text: 'Price Ascending'},
    {value: 'priceDesc', text: 'Price Descending'},
    {value: 'rangeAsc', text: 'Range Ascending'},
    {value: 'rangeDesc', text: 'Range Descending'},
  ];
  selectedSortOption: string;
  

  onChangeRange(range){
    this.selectedRange = range;
  }

  onChangeCost(cost){
    this.selectedCost = cost;
  }

  onChangeSort(option){
    this.selectedSortOption = option;
  }

  constructor() { }
  
  ngOnInit(): void {
    this.selectedCost = 0;
    this.selectedRange = 0;
    this.selectedSortOption = 'priceAsc';
  }
}
