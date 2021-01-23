import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import content from '../../content/content.json';
import { StorageItem } from '../models/storage-item';
import { StorageService } from '../services/storage.service';
import { CountDownTimer } from '../models/main-timer';

@Component({
	selector: 'app-profile-form',
	templateUrl: './profile-form.component.html',
	styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit, OnDestroy {
	content = content;
	unsubscribe$: Subject<any> = new Subject();

	profileForm = this.fb.group({
		profileName: ['', [Validators.required]],
		mainTimeGroup: this.fb.group({
			h: [null, [Validators.min(0)]],
			m: [null, [Validators.min(0)]],
			s: [null, [Validators.min(0)]],
		}),
		subtimeArrayGroup: this.fb.array([]),
	});

	constructor(private modalController: ModalController, private fb: FormBuilder, private storageService: StorageService) {}

	ngOnInit() {}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	ionViewDidEnter() {
		console.log("Entered Profile Components")
		this.watchMainGroupForOverValues();
	}

	//getters

	get mainTimeForm() {
		return this.profileForm.get('mainTimeGroup') as FormGroup;
	}

	get profileName() {
		return this.profileForm.get('profileName') as FormGroup;
	}

	get subtimeArray() {
		return this.profileForm.get('subtimeArrayGroup') as FormArray;
	}

	get subtimeForm() {
		return this.subtimeArray.get('subtimeGroup') as FormGroup;
	}

	async dismissModal() {
		this.modalController.dismiss({
			dismissed: true,
		});
	}

	addNewSubtimer(): void {
		const subtimeGroup: FormGroup = this.fb.group({
			h: [null, [Validators.min(0)]],
			m: [null, [Validators.min(0)]],
			s: [null, [Validators.min(0)]],
		});

		this.watchSubtimeForOverValues(subtimeGroup);
		this.subtimeArray.push(subtimeGroup);
	}

	async saveProfile(): Promise<void> {
		const newProfile = {} as StorageItem;
		//create watcher to check fo zero value
		this.scrubObjectNullValues(this.mainTimeForm.value);
		this.subtimeArray.value.map(val => this.scrubObjectNullValues(val));

		newProfile.id = this.profileName.value.toLowerCase().trim();
		newProfile.profileName = this.profileName.value.toLowerCase().trim();
		newProfile.timer = {
			main: this.mainTimeForm.value,
			subtimer: this.subtimeArray.value,
		};
		

		await this.storageService.createProfile(newProfile);
		this.subtimeArray.clear();
		this.profileForm.reset();
		console.log(this.storageService.loadProfiles())
	}

	async clearProfile() {
		await this.storageService.clearAll();
		console.log(await this.storageService.loadProfiles());
	}

	deleteSubtimeForm = (i) => {
		this.subtimeArray.removeAt(i);
	};

	//watchers
	private watchMainGroupForOverValues(): void {
		const mainTimeGroupRestraints = this.mainTimeForm.valueChanges.pipe(takeUntil(this.unsubscribe$), debounceTime(1000));

		mainTimeGroupRestraints.subscribe((val) => {
			const checkedValues = this.preventOverValues(val);
			this.mainTimeForm.patchValue({ ...checkedValues });
		});
	}

	private watchSubtimeForOverValues(subtimeGroup): void {
		subtimeGroup.valueChanges.pipe(takeUntil(this.unsubscribe$), debounceTime(1000)).subscribe((val) => {
			const checkedValues = this.preventOverValues(val);
			subtimeGroup.patchValue({ ...checkedValues });
		});
	}

	private preventOverValues(val): CountDownTimer {
		let newValue = {} as CountDownTimer;

		if (val.h > 24) {
			newValue = { ...val, h: 24 };
		}
		if (val.m > 60) {
			newValue = { ...val, m: 60 };
		}
		if (val.s > 60) {
			newValue = { ...val, s: 60 };
		}

		return newValue;
	}

	preventEValue(e): void {
		if ((e.which != 8 && e.which != 0 && e.which < 48) || e.which > 57) {
			e.preventDefault();
		}
	}

	private scrubObjectNullValues(obj:Object):void {
		Object.keys(obj).map((key) => {
			if (obj[key] === null){ obj[key] = 0;}
		  });
	}

	private scrubArrayNullValues(arr:Array<any>) {
		return arr.map(val => this.scrubObjectNullValues(val))
	}
}
