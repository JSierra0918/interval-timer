export interface TimerModel {
    main: CountDownTimer;
    subtimer: CountDownTimer[];
}

export interface CountDownTimer {
    h?: number|string;
    m?: number|string;
    s?: number|string;
    ms?: number|string;
    isRunning?: boolean;
}