import {Component, computed, OnDestroy, OnInit, signal} from '@angular/core';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
    private currentTimeSignal = signal(new Date());
    currentTime = computed(() => {
        const d = this.currentTimeSignal();
        return d.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    });
    private timerId: number | undefined;

    ngOnInit(): void {
        this.timerId = window.setInterval(() => {
            this.currentTimeSignal.set(new Date());
        }, 1000);
        ;
    }

    ngOnDestroy(): void {
        if (this.timerId !== undefined) {
            clearInterval(this.timerId);
        }
    }
}
