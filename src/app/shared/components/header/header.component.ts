import {Component, computed, inject, input} from '@angular/core';
import {TimeService} from '../../../core/time.service';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    private timeService = inject(TimeService);
    currentTime = computed(() => this.timeService.currentTimeString());
    schoolName = input<string>();
}
