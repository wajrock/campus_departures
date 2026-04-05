import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'displayDepartureTime',
})
export class DisplayDepartureTimePipe implements PipeTransform {
    transform(value: unknown, ...args: unknown[]): unknown {
        return null;
    }
}
