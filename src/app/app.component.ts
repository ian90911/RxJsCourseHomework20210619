import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from, interval, partition, Subject, Subscription  } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
  lapTime$ = new Subject<number>();
  oddSubscription: Subscription;
  evenSubscription: Subscription;

  ngOnInit() {
    const mapLapTime$ = this.lapTime$.pipe(
      map((data,index)=>{
        return {data:data,index:index+1}
      })
    );

    const parts = partition(mapLapTime$,
      data=>data.index %2 ===0);

    this.evenSubscription = parts[0].subscribe({
      next:data=>this.evenLapTimes.push(data.data)
    });

    this.oddSubscription = parts[1].subscribe({
      next:data=>this.oddLapTimes.push(data.data)
    });
  }

  start() {
    if (this.subscription === undefined || this.subscription.closed) {
      if (this.stopped) {
        this.second = new BehaviorSubject(0);
        this.stopped = false;
        this.oddLapTimes = [];
        this.evenLapTimes = [];
        this.totalLapTimes = [];
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
      this.lapTime$.next(this.second.value)
    }
  }

}
