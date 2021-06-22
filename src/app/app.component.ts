import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  
  second = 103.3;
  totalLapTimes = [10.2, 20.7, 35.9, 48.1, 55, 77.4];
  oddLapTimes = [10.2, 35.9, 55];
  evenLapTimes = [20.7, 48.1, 77.4];

  ngOnInit() {
   
  }

  start() {

  }

  pause() {

  }

  stop() {

  }

  divide() {

  }
}
