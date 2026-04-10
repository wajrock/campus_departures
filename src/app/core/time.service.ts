import {Injectable, computed, signal} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TimeService {
    private currentTimeSubject = new BehaviorSubject<Date>(new Date());
    currentTime$ = this.currentTimeSubject.asObservable();

    private currentTimeSignal = signal(new Date());
    currentTime = computed(() => this.currentTimeSignal());
    currentTimeString = computed(() => {
        const now = this.currentTimeSignal();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    });

    constructor() {
        this.tick();
    }

    private tick(): void {
        const now = new Date();
        this.currentTimeSubject.next(now);
        this.currentTimeSignal.set(now);
        const delay = 1000 - now.getMilliseconds();
        window.setTimeout(() => this.tick(), delay);
    }
}
