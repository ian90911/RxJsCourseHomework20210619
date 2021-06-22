import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  second = 0.0;
  totalLapTimes = [10.2, 20.7, 35.9, 48.1, 55, 77.4];
  oddLapTimes = [10.2, 35.9, 55];
  evenLapTimes = [20.7, 48.1, 77.4];
  milisecond$ = interval(100);
  subscription:Subscription;

  ngOnInit() {}

  start() {
    this.subscription = this.milisecond$.subscribe({
      next: data => this.updateSecond(data)
    });
  }

  pause() {
    this.subscription.unsubscribe();
  }

  stop() {}

  divide() {}

  updateSecond(data: number) {
    this.second += 0.1;
  }
}
