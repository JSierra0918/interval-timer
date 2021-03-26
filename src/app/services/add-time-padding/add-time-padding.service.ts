import { Injectable } from '@angular/core';
import { CountDownTimer } from 'src/app/models/main-timer';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  addTimePadding(t: CountDownTimer): CountDownTimer {
		let paddedT: CountDownTimer = { ...t };
		for (const key in t) {
			if (paddedT[key] !== null) {
				paddedT[key] = t[key].toString().padStart(2, '0');
			}
		}

		return paddedT;
	}
}
