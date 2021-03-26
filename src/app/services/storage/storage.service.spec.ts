import { TestBed } from '@angular/core/testing';
import { TimerModel } from '../../models/main-timer';
import { Storage } from '@ionic/storage';

import { StorageService } from './storage.service';
import { StorageItem } from '../../models/storage-item';

describe('StorageService', () => {
	let service: StorageService;
	let timer: Promise<StorageItem>;
	let storage: Storage;

	const main = { h: 0, m: 0, s: 20 };

	const subTimer = [
		{
			h: 0,
			m: 0,
			s: 10,
		},
		{
			h: 0,
			m: 0,
			s: 5,
		},
	];

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(StorageService);
		storage = TestBed.inject(Storage);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	// fdescribe('StorageService', () => {
	// 	it('should load all profiles', async () => {
	// 		spyOn(storage, 'get').and.returnValue(timer);
	// 		const response = await service.loadProfiles();

	// 		// TODO: Not working, figure out how to return something from loadProfiles.
	// 	});
	// });
});
