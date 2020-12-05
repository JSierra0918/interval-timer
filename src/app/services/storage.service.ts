import { Injectable } from '@angular/core';
import { StorageItem } from '../models/storage-item';
import { Storage } from '@ionic/storage';

const profileKey = 'profiles';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	constructor(private storage: Storage) {}

	loadProfiles(): Promise<StorageItem[]> {
		return this.storage.get(profileKey);
	}

	async addNewProfile(item: StorageItem): Promise<any> {
		const storedItems: StorageItem[] = await this.storage.get(profileKey);
		if (storedItems) {
			storedItems.push(item);
			return this.storage.set(profileKey, storedItems);
		} else {
			return this.storage.set(profileKey, [storedItems]);
		}
	}

	editProfile(item: StorageItem) {}

	deleteProfile(item: StorageItem) {}
}
