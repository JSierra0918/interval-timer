import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
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
	test = Array(3);
	content = content;

	profileForm = this.fb.group({
		profileName: [''],
		mainTimer: this.fb.group({
			h: '',
			m: '',
			s: '',
		}),
	});

	constructor(private modalController: ModalController, private fb: FormBuilder, private storageService: StorageService) {}

	ngOnInit() {
		console.log(this.profileForm);
	}

	async dismissModal() {
		this.modalController.dismiss({
			dismissed: true,
		});
	}

	addNewSubtimer() {
		this.test.push('');
	}

	saveProfile() {
		const newProfile = {} as StorageItem;

		newProfile.id = this.profileForm.value.profileName;
		newProfile.profileName = this.profileForm.value.profileName;
		newProfile.timer = {
			main: {},
			subtimer: [],
		};
	}
}
