import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
			h: [null, [Validators.maxLength(2)]],
			m: [null, [Validators.maxLength(2)]],
			s: [null, [Validators.maxLength(2)]],
		}),
		subTimeGroup: this.fb.array([]),
	});

	constructor(private modalController: ModalController, private fb: FormBuilder, private storageService: StorageService) { }

	ngOnInit() { }

	async dismissModal() {
		this.modalController.dismiss({
			dismissed: true,
		});
	}

	get subtimeForm() {
		return this.profileForm.get('subTimeGroup') as FormArray;
	}

	addNewSubtimer() {
		const subtime = this.fb.group({
			h: [null],
			m: [null],
			s: [null],
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

	minimumNumbers(e) {
		const length = e.target.value.length;
		if (e.code === "KeyE") { return false }
		if (length === 2) { e.target.value = e.target.value.slice(0, 1) }
	}

	maxInput(e, maxNum: number) {
		const val = e.target.value;
		console.log(e);
		if (val >= maxNum) {console.log(val); e.target.value = maxNum }
	}


}
