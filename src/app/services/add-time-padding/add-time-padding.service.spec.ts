import { TestBed } from '@angular/core/testing';
import { CountDownTimer } from 'src/app/models/main-timer';

import { TimerService } from './add-time-padding.service';

describe('AddTimePaddingService', () => {
	let service: TimerService;
	let timer: CountDownTimer = {
		h: 3,
		m: 10,
		s: 5,
	};

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TimerService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return any number or string less than ten with a zero infront', () => {
    const expectedResult:CountDownTimer = {
      h: '03',
      m: '10',
      s: '05'
    }
		const paddedTime = service.addTimePadding(timer);
		expect(paddedTime).toEqual(expectedResult);
	});
});
