import {Pipe, PipeTransform} from '@angular/core';
import {BusLine} from '../models/models';

type BusLineWithDepart = BusLine & { departTime: Date };

@Pipe({
    name: 'validBusTimes',
})
export class ValidBusTimesPipe implements PipeTransform {
    transform(timesBusLine: BusLine[], now = new Date()): BusLine[] {
        const sortedTimetable = timesBusLine
            .map(time => ({...time, departTime: new Date(time.depart)} as BusLineWithDepart))
            .filter(time => time.departTime.getTime() - now.getTime() > 30 * 1000)
            .sort((a, b) => a.departTime.getTime() - b.departTime.getTime());

        const uniqueDepartures = sortedTimetable.filter((time, index, list) => {
            return index === 0 || list[index - 1].depart !== time.depart;
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return uniqueDepartures.slice(0, 3).map(({departTime, ...rest}) => rest);
    }
}
