import { Component, OnInit } from "@angular/core";
import { timer } from "rxjs";
import { TimerModel, CountDownTimer } from "../models/main-timer";
import { SubtimerComponent } from '../subtimer/subtimer.component';

@Component({
  selector: "app-timer-container",
  templateUrl: "./timer-container.component.html",
  styleUrls: ["./timer-container.component.scss"],
})
export class TimerContainerComponent implements OnInit {
  time: TimerModel = { main: {}, subtimer: [] };
  timerInterval: any;

  constructor() {}

  ngOnInit() {
    this.time.main = {
      h: 0,
      m: 1,
      s: 0,
    };

    this.time.subtimer = [
      {
        h: 0,
        m: 0,
        s: 15,
      }, 
      {
        h: 0,
        m: 0,
        s: 5,
      }
    ]
  }

  startTheTime() {
    if (this.time.main.isRunning) {
      return;
    }

    this.time.main.isRunning = true;
    this.timerInterval = setInterval(() => {
      const mainTimer = this.timerCountDown(this.time.main);
      //Assign to main timer; has to be a better way than this.
      this.time.main.h = mainTimer.h;
      this.time.main.m = mainTimer.m;
      this.time.main.s = mainTimer.s;

      //figure out best way to do this.  May need a function for it
      this.time.subtimer.forEach(sTime => {
        const subTimer = this.timerCountDown(sTime);
        sTime.h = subTimer.h;
        sTime.m = subTimer.m;
        sTime.s = subTimer.s;
        console.log("subTime")
        console.log(sTime.h, sTime.m, sTime.s);
      });
    }, 1000);

  }

  pauseTheTimer() {
    this.time.main.isRunning = false;
    clearInterval(this.timerInterval);
  }

  timerCountDown({ h, m, s }: CountDownTimer): CountDownTimer {
    // get Total seconds
    let totalSeconds = this.convertToTotalSeconds(
      Number(h),
      Number(m),
      Number(s)
    );

    if (totalSeconds > 0) {
      totalSeconds--;

      //convert back to hours, minutes, seconds
      h = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      m = Math.floor(totalSeconds / 60);
      s = totalSeconds % 60;

      // add padding
      h = this.addPadding(h);
      m = this.addPadding(m);
      s = this.addPadding(s);
    } else {
      // main timer is done.
      h = this.addPadding(0);
      m = this.addPadding(0);
      s = this.addPadding(0);
    }

    return { h, m, s };
  }

  convertToTotalSeconds(h: number, m: number, s: number): number {
    const hoursAsSeconds = h * 3600;
    const minutesAsSeconds = m * 60;

    return hoursAsSeconds + minutesAsSeconds + s;
  }

  addPadding(t) {
    return t.toString().padStart(2, "0");
  }
}
