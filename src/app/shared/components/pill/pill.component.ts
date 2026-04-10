import {Component, computed, inject, input} from '@angular/core';
import {DisplayInformationPillPipe} from '../../pipes/display-information-pill.pipe';
import {PillData} from '../../models/models';
import {TimeService} from '../../../core/time.service';

@Component({
    selector: 'app-pill',
    imports: [DisplayInformationPillPipe],
    templateUrl: './pill.component.html',
    styleUrl: './pill.component.scss',
})
export class PillComponent {
    data = input.required<PillData>();
    loading = input<boolean>(false);
    inactive = input<boolean>(false);
    timeService = inject(TimeService);

    isUrgent = computed(() => {
        const data = this.data();
        if (data.type === 'bus' && data.valueState === 'existing') {
            const now = this.timeService.currentTime();
            const departureTime = new Date(data.value.toString());
            const diffInMinutes = Math.round((departureTime.getTime() - now.getTime()) / 60000);
            return diffInMinutes > 0 && diffInMinutes <= 2;
        }
        return false;
    });
}
