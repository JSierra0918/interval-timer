import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimerModel } from '../../models/main-timer';

@Component({
  selector: 'app-maintimer',
  templateUrl: './maintimer.component.html',
  styleUrls: ['./maintimer.component.scss'],
})
export class MaintimerComponent implements OnInit {

  @Input() mainTime: TimerModel;
  
  @Output() startTheTimer = new EventEmitter<any>();
  @Output() resetTheTimer = new EventEmitter<any>();
  @Output() pauseTheTimer = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  startTimer() {
    this.startTheTimer.emit();
  }

  resetTimer() {
    this.resetTheTimer.emit();
  }

  pauseTimer() {
    this.pauseTheTimer.emit();
  }
} 
