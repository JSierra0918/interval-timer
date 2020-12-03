import { Component, Input, OnInit } from '@angular/core';
import { TimerModel } from '../models/main-timer';

@Component({
  selector: 'app-subtimer',
  templateUrl: './subtimer.component.html',
  styleUrls: ['./subtimer.component.scss'],
})
export class SubtimerComponent implements OnInit {

  testArray: Array<number> = new Array(10);
  @Input() subtime: TimerModel;

  constructor() { }

  // TODO: create subtimer logic where it cannot be set higher than main timer. It cannot pass main timer.  If it's higher than main timer, then match it.
  ngOnInit() {
    console.log(this.subtime);

  }

}
