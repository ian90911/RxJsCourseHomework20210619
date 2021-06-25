import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  second: BehaviorSubject<number> = new BehaviorSubject(0);
  totalLapTimes = [];
  oddLapTimes = [];
  evenLapTimes = [];
  milisecond$ = interval(100);
  subscription: Subscription;
  stopped: boolean;
  counter: number = 0;

  ngOnInit() {}

  start() {
    if (this.subscription === undefined || this.subscription.closed) {
      if (this.stopped) {
        this.second = new BehaviorSubject(0);
        this.stopped = false;
      }
      this.subscription = this.milisecond$.subscribe({
        next: data => this.second.next(this.second.value + 0.1)
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
    if (this.second.value > 0) {
      this.totalLapTimes.push(this.second.value);
      switch (this.counter % 2) {
        case 0:
          this.oddLapTimes.push(this.second.value);
          break;
        case 1:
          this.evenLapTimes.push(this.second.value);
          break;
      }
      this.counter++;
    }
  }

}
