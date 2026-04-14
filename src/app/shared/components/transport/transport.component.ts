import {Component, inject, input, OnInit} from '@angular/core';
import {PillComponent} from '../pill/pill.component';
import {StarService} from '../../../core/star/star.service';
import {combineLatest, map, Observable, switchMap, timer} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {ValidBusTimesPipe} from '../../pipes/valid-bus-times.pipe';
import {TimeService} from '../../../core/time.service';
import {BikeStation, BusLine} from '../../models/api.models';
import {TransportInfos} from '../../models/models';

@Component({
    selector: 'app-transport',
    imports: [AsyncPipe, PillComponent],
    templateUrl: './transport.component.html',
    styleUrl: './transport.component.scss',
    providers: [ValidBusTimesPipe]
})
export class TransportComponent implements OnInit{
    starService = inject(StarService);
    timeService = inject(TimeService);
    infos = input.required<TransportInfos>();
    data$!: Observable<BikeStation | BusLine[] | null>;
    currentTime$ = this.timeService.currentTime$;
    private validBusTimesPipe = inject(ValidBusTimesPipe);

    ngOnInit(): void {
        const apiData$ = timer(0, 5 * 60 * 1000).pipe(
            switchMap(() => {
                return this.infos().type === 'bikes'
                    ? this.starService.getBikesFromStation(this.infos().id)
                    : this.starService.getTimesFromBusLine(this.infos());
            })
        );

        this.data$ = combineLatest([apiData$, this.currentTime$]).pipe(
            
            
            map(([data, now]) => {
                if (Array.isArray(data)) {
                    return this.validBusTimesPipe.transform(data, now);
                }
                return data;
            })
        );
    }

    isBikeStation(data: BikeStation | BusLine[] | null): data is BikeStation {
        return !!(data && 'nombrevelosdisponibles' in data);
    }

    isBusLines(data: BikeStation | BusLine[] | null): data is BusLine[] {
        return Array.isArray(data);
    }
}
