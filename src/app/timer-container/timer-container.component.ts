import { Component, OnInit } from '@angular/core';
import { TimerModel, CountDownTimer } from '../models/main-timer';
import { ModalController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import * as content from '../../content/content.json';

@Component({
	selector: 'app-timer-container',
	templateUrl: './timer-container.component.html',
	styleUrls: ['./timer-container.component.scss'],
})
export class TimerContainerComponent implements OnInit {
	time: TimerModel = { main: null, subtimer: [] };
	timerInterval: any;
	isCreatingProfile: boolean = false;
	content = content;

	constructor(public modalController: ModalController, private routerOutlet: IonRouterOutlet) {}

	ngOnInit() {
		// this.time.main = {
		// 	h: 0,
		// 	m: 0,
		// 	s: 20,
		// };
		// this.time.subtimer = [
		// 	{
		// 		h: 0,
		// 		m: 0,
		// 		s: 10,
		// 	},
		// 	{
		// 		h: 0,
		// 		m: 0,
		// 		s: 5,
		// 	},
		// ];
	}

	startTheTimer = () => {
		if (this.time.main.isRunning) {
			return;
		}

		this.time.main.isRunning = true;
		this.timerInterval = setInterval(() => {
			const mainTimer = this.timerCountDown(this.time.main);

			//figure out best way to do this.  May need a function for it
			this.time.subtimer.forEach((sTime) => {
				let subTimer = this.timerCountDown(sTime);

				// subtimers cannot go longer than main timer; makes subtimers equal to main if they're higher
				if (mainTimer.h < subTimer.h) subTimer.h = mainTimer.h;
				if (mainTimer.m < subTimer.m) subTimer.m = mainTimer.m;
				if (mainTimer.s < subTimer.s) subTimer.s = mainTimer.s;

				subTimer = { ...this.addPadding(subTimer) };
				sTime.h = subTimer.h;
				sTime.m = subTimer.m;
				sTime.s = subTimer.s;
			});

			this.time.main = { ...this.time.main, ...this.addPadding(mainTimer) };
		}, 1000);
	};

	pauseTheTimer = () => {
		this.time.main.isRunning = false;
		clearInterval(this.timerInterval);
	};

	private timerCountDown({ h, m, s }: CountDownTimer): CountDownTimer {
		// get Total seconds
		let totalSeconds = this.convertToTotalSeconds(Number(h), Number(m), Number(s));

		if (totalSeconds > 0) {
			totalSeconds--;

			//convert back to hours, minutes, seconds
			h = Math.floor(totalSeconds / 3600);
			totalSeconds %= 3600;
			m = Math.floor(totalSeconds / 60);
			s = totalSeconds % 60;
		} else {
			// main timer is done.
			h = 0;
			m = 0;
			s = 0;
		}

		return { h, m, s };
	}

	private convertToTotalSeconds(h: number, m: number, s: number): number {
		const hoursAsSeconds = h * 3600;
		const minutesAsSeconds = m * 60;

		return hoursAsSeconds + minutesAsSeconds + s;
	}

	private addPadding(t: CountDownTimer): CountDownTimer {
		let paddedT: CountDownTimer = { ...t };
		for (const key in t) {
			if (paddedT[key] !== null) {
				paddedT[key] = t[key].toString().padStart(2, '0');
			}
		}

		return paddedT;
	}

	createProfile() {
		this.isCreatingProfile = !this.isCreatingProfile;
		console.log('isCreatingProfile:', this.isCreatingProfile);
		this.presentModal();
	}

	async presentModal() {
		const modal = await this.modalController.create({
			component: ProfileFormComponent,
			cssClass: 'my-custom-class',
			swipeToClose: true,
			presentingElement: this.routerOutlet.nativeEl,
			componentProps: this.time,
		});

		// const {data} = await modal.onDidDismiss();
		// console.log(data)
		return await modal.present();
	}
}
