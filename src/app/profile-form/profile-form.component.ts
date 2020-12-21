import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { filter, tap } from 'rxjs/operators';
import content from '../../content/content.json';
import { StorageItem } from '../models/storage-item';
import { StorageService } from '../services/storage.service';

@Component({
	selector: 'app-profile-form',
	templateUrl: './profile-form.component.html',
	styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
	content = content;

	profileForm = this.fb.group({
		profileName: ['', [Validators.required]],
		mainTimeGroup: this.fb.group({
			h: [null, [Validators.min(0)]],
			m: [null, [Validators.min(0)]],
			s: [null, [Validators.min(0)]],
		}),
		subTimeGroup: this.fb.array([]),
	});

	constructor(private modalController: ModalController, private fb: FormBuilder, private storageService: StorageService) { }

	ngOnInit() { this.onChanges() }

	get mainTimeForm() {
		return this.profileForm.get('mainTimeGroup') as FormArray;
	}

	get subtimeForm() {
		return this.profileForm.get('subTimeGroup') as FormArray;
	}

	async dismissModal() {
		this.modalController.dismiss({
			dismissed: true,
		});
	}

	addNewSubtimer(): void {
		const subtime = this.fb.group({
			h: [null, [Validators.min(0)]],
			m: [null, [Validators.min(0)]],
			s: [null, [Validators.min(0)]],
		});

		this.subtimeForm.push(subtime);
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
		this.subtimeForm.removeAt(i);
	}

	private onChanges(): void {
		const mainTimeGroupRestraints = this.mainTimeForm.valueChanges.pipe(tap(val => {
			if (val.h > 24 || val.h < 0) { this.mainTimeForm.patchValue({ ...val, h: 24 }) }
			if (val.m > 60) { this.mainTimeForm.patchValue({ ...val, m: 60 }) }
			if (val.s > 60) { this.mainTimeForm.patchValue({ ...val, s: 60 }) }
		}));

		const subtimeGroupRestraints =this.subtimeForm.valueChanges.pipe(tap(val => {
			if (val.h > 24) { this.subtimeForm.patchValue({ ...val, h: 24 }) }
			if (val.m > 60) { this.subtimeForm.patchValue({ ...val, m: 60 }) }
			if (val.s > 60) { this.subtimeForm.patchValue({ ...val, s: 60 }) }
		}));
		mainTimeGroupRestraints.subscribe();
		subtimeGroupRestraints.subscribe()

		// subscribe to formArray
	}

	preventEValue(e): void {
		if (e.which != 8 && e.which != 0 && e.which < 48 || e.which > 57) {
			e.preventDefault();
		}
	}
}
