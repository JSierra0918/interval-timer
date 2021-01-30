import { TimerModel } from './main-timer';

export interface StorageItem {
    id: string;
    profileName: string;
    timer: TimerModel;
}