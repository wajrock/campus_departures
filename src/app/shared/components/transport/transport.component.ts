import {Component, inject, input, OnInit} from '@angular/core';
import {BikeStation, TransportInfos} from '../../models/models';
import {PillComponent} from '../pill/pill.component';
import {StarService} from '../../../core/star/star.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'app-transport',
    imports: [AsyncPipe, PillComponent],
    templateUrl: './transport.component.html',
    styleUrl: './transport.component.scss',
})
export class TransportComponent implements OnInit{
    starService = inject(StarService);
    infos = input.required<TransportInfos>();
    data$!: Observable<BikeStation | null>;

    ngOnInit(): void {
        this.data$ = this.starService.getBikeStation(this.infos().id);
    }
}
