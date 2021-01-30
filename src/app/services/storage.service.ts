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

	async clearAll(): Promise<void> {
		return await this.storage.clear();
	}

	async createProfile(item: StorageItem): Promise<any> {
		const storedItems: StorageItem[] = await this.storage.get(profileKey);

		if (storedItems && storedItems.length > 0) {
			const newItem: StorageItem[] = storedItems.map(profile => ({...profile, ...item}));
			return this.storage.set(profileKey, newItem);
		} else {
			return this.storage.set(profileKey, [item]);
		}
	}

	async editProfile(item: StorageItem) {
		const storedItems: StorageItem[] = await this.storage.get(profileKey);
		if (!storedItems || storedItems.length === 0) {
			return;
		}

		const newItem: StorageItem[] = storedItems.map(profile => ({...profile, ...item}));

		return this.storage.set(profileKey, newItem);
	}

	async deleteProfile(item: StorageItem) {
		const storedItems: StorageItem[] = await this.storage.get(profileKey);

		if (!storedItems || storedItems.length === 0) {
			return;
		}
		const newItem: StorageItem[] = storedItems.filter((profile) => profile.id.toLowerCase() !== item.id.toLowerCase());
		return this.storage.set(profileKey, newItem);
	}
}
