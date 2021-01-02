import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, AbstractControl, FormGroup, Form } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import content from '../../content/content.json';
import { StorageItem } from '../models/storage-item';
import { StorageService } from '../services/storage.service';

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
		this.watchMainGroupChanges();
	}

	//getters

	get mainTimeForm() {
		return this.profileForm.get('mainTimeGroup') as FormGroup;
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

		this.watchSubtimeGroupChanges(subtimeGroup);
		this.subtimeArray.push(subtimeGroup);
	}

	saveProfile(): void {
		const newProfile = {} as StorageItem;

		newProfile.id = this.profileForm.value.profileName;
		newProfile.profileName = this.profileForm.value.profileName;
		newProfile.timer = {
			main: {},
			subtimer: [],
		};
	}

	maxOfTwentyFourHours(c: AbstractControl): { [key: string]: boolean } | null {
		return null;
	}

	deleteSubtimeForm = (i) => {
		this.subtimeArray.removeAt(i);
	};

	//watchers
	private watchMainGroupChanges(): void {
		const mainTimeGroupRestraints = this.mainTimeForm.valueChanges.pipe(
			takeUntil(this.unsubscribe$),
			tap((val) => {
				console.log(this.profileForm);
				if (val.h > 24 || val.h < 0) {
					this.mainTimeForm.patchValue({ ...val, h: 24 });
				}
				if (val.m > 60) {
					this.mainTimeForm.patchValue({ ...val, m: 60 });
				}
				if (val.s > 60) {
					this.mainTimeForm.patchValue({ ...val, s: 60 });
				}
			})
		);

		mainTimeGroupRestraints.subscribe();
	}

	private watchSubtimeGroupChanges(subtimeGroup): void {
		subtimeGroup.valueChanges.pipe(takeUntil(this.unsubscribe$), debounceTime(1000)).subscribe((val) => {
			if (val.h > 24 || val.h < 0) {
				subtimeGroup.patchValue({ ...val, h: 24 });
			}
			if (val.m > 60) {
				subtimeGroup.patchValue({ ...val, m: 60 });
			}
			if (val.s > 60) {
				subtimeGroup.patchValue({ ...val, s: 60 });
			}
		});
	}

	preventEValue(e): void {
		if ((e.which != 8 && e.which != 0 && e.which < 48) || e.which > 57) {
			e.preventDefault();
		}
	}
}
