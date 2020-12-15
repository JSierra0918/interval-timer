import { TimerModel } from './main-timer';

export interface StorageItem {
    id: string|number;
    profileName: string;
    timer: TimerModel;
}