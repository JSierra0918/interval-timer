import { TimerModel } from './main-timer';

export interface StorageItem {
    id: number;
    profileName: string;
    timer: TimerModel;
}