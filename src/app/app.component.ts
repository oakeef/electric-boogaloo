import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'electric-boogaloo';
  ranges:Array<Object> = [
    {value: 0, text: 'Any Range'},
    {value: 100, text: 'More than 100KM'},
    {value: 200, text: 'More than 200KM'},
    {value: 300, text: 'More than 300KM'},
  ];
  selectedRange: number;

  onChangeRange(range){
    this.selectedRange = range;
  }

  constructor() { }
  
  ngOnInit(): void {
    
  }
}
