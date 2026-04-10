import {Pipe, PipeTransform, inject} from '@angular/core';
import {PillData} from '../models/models';
import {TimeService} from '../../core/time.service';

@Pipe({
    name: 'displayInformationPill',
})
export class DisplayInformationPillPipe implements PipeTransform {
    private timeService = inject(TimeService);

    transform(data: PillData, currentTime: Date): string {
        console.log("called");
        
        if (data.valueState === 'missing') {
            return "-";
        }

        if (data.type === 'bikes' && data.valueState === 'existing') {
            return `${data.value} vélo${Number(data.value) > 1 ? 's' : ''}`;
        }

        if (data.type === 'bus' && data.valueState === 'empty') {
            return "Aucun trajets";
        }

        if (data.type === 'bus' && data.valueState === 'existing') {
            const now = currentTime;
            const departureTime = new Date(data.value.toString());
            const diffInMinutes = (departureTime.getTime() - now.getTime()) / 60000;

            if (diffInMinutes >= 60){
                return `${departureTime.getHours()}h${departureTime.getMinutes().toString().padStart(2, '0')}`;
            } else if (Math.round(diffInMinutes) <= 1) {
                return `< 1 min`;
            } else {
                return `${Math.round(diffInMinutes)} min`; 
            }
        }

        return data.value.toLocaleString();
    }
}
