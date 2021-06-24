import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  second = 0.0;
  totalLapTimes = [];
  oddLapTimes = [10.2, 35.9, 55];
  evenLapTimes = [20.7, 48.1, 77.4];
  milisecond$ = interval(100);
  subscription: Subscription;
  stopped: boolean;

  ngOnInit() {}

  start() {
    if (this.subscription === undefined || this.subscription.closed) {
      if (this.stopped) {
        this.second = 0.0;
        this.stopped = false;
      }
      this.subscription = this.milisecond$.subscribe({
        next: data => this.updateSecond(data)
      });
    }
  }

  pause() {
    this.subscription.unsubscribe();
  }

  stop() {
    this.stopped = true;
    this.subscription.unsubscribe();
  }

  divide() {
    if (this.second > 0) this.totalLapTimes.push(this.second);
  }

  updateSecond(data: number) {
    this.second += 0.1;
  }
}
