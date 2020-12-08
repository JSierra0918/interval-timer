import { Injectable } from '@angular/core';
import { StorageItem } from '../models/storage-item';
import { Storage } from '@ionic/storage';

const profileKey = 'profiles';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	constructor(private storage: Storage) {}

	async loadProfiles(): Promise<StorageItem[]> {
		return await this.storage.get(profileKey);
	}

	async createProfile(item: StorageItem): Promise<any> {
		const storedItems: StorageItem[] = await this.storage.get(profileKey);
		if (storedItems) { storedItems.push(item); 
			return this.storage.set(profileKey, storedItems);
		} else {
			return this.storage.set(profileKey, [storedItems]);
		}
	}

	async editProfile(item: StorageItem) {
		const storedItems: StorageItem[] = await this.storage.get(profileKey);
		if (!storedItems || storedItems.length === 0) { return; }

		const newItem: StorageItem[] = [...storedItems, item];
		return this.storage.set(profileKey, newItem);
	}

	async deleteProfile(item: StorageItem) {
		const storedItems: StorageItem[] = await this.storage.get(profileKey);
		if (!storedItems || storedItems.length === 0) { return; }

		const newItem: StorageItem[] = storedItems.filter((profile) => profile.id !== item.id);
		return this.storage.set(profileKey, newItem);
	}
}
