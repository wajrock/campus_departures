import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {firstValueFrom, of} from 'rxjs';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {StarService} from '../../../core/star/star.service';
import {BikeStation, BusLine, TransportInfos} from '../../models/models';
import {ValidBusTimesPipe} from '../../pipes/valid-bus-times.pipe';
import {PillComponent} from '../pill/pill.component';
import {TransportComponent} from './transport.component';

describe('TransportComponent', () => {
    let component: TransportComponent;
    let fixture: ComponentFixture<TransportComponent>;

    const starServiceMock = {
        getBikesFromStation: vi.fn(),
        getTimesFromBusLine: vi.fn()
    };

    const defaultInfos: TransportInfos = {
        id: '1',
        type: 'metro',
        name: 'Test Metro',
        stop: 'Test Stop',
        icon: 'metro',
    };

    beforeEach(async () => {
        vi.clearAllMocks();

        starServiceMock.getBikesFromStation.mockReturnValue(of(null));
        starServiceMock.getTimesFromBusLine.mockReturnValue(of([]));

        await TestBed.configureTestingModule({
            imports: [TransportComponent, PillComponent],
            providers: [
                {provide: StarService, useValue: starServiceMock},
                ValidBusTimesPipe
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TransportComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('infos', defaultInfos);
        fixture.detectChanges();
    });

    describe('Initialization & UI', () => {
        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should render transport name and stop correctly', () => {
            const compiled = fixture.nativeElement as HTMLElement;
            expect(compiled.querySelector('.transport-details-name')?.textContent).toContain(defaultInfos.name);
            expect(compiled.querySelector('.transport-details-stop p')?.textContent).toContain(defaultInfos.stop);
        });
    });

    describe('Logic: Type Guards', () => {
        it('should validate bike station and bus lines types', () => {
            const bikeStation = {idstation: 'B1', nombrevelosdisponibles: 0, nombreemplacementsactuels: 10, nombreemplacementsdisponibles: 10} as BikeStation;
            const busLines = [{idligne: '1', sens: 1, depart: '2026-04-09T10:00:00Z'}] as BusLine[];

            expect(component.isBikeStation(bikeStation)).toBe(true);
            expect(component.isBusLines(busLines)).toBe(true);
            expect(component.isBusLines(bikeStation)).toBe(false);
        });
    });

    describe('Pill Integration', () => {
        
        it('should pass inactive=true to bike pill when no bikes available', async () => {
            const bikeStation: BikeStation = {
                idstation: 'B1', nom: 'Station', etat: 'En fonctionnement',
                nombrevelosdisponibles: 0, 
                nombreemplacementsactuels: 10, nombreemplacementsdisponibles: 10
            };

            fixture.componentRef.setInput('infos', {...defaultInfos, type: 'bikes'});
            component.data$ = of(bikeStation);
            fixture.detectChanges();

            const pill = fixture.debugElement.query(By.directive(PillComponent)).componentInstance as PillComponent;
            expect(pill.inactive()).toBe(true);
        });

        it('should handle bus time slots', async () => {
            const busLines: BusLine[] = [{idligne: 'C4', sens: 1, depart: '2026-04-09T10:00:00Z'}];

            fixture.componentRef.setInput('infos', {...defaultInfos, type: 'bus'});
            component.data$ = of(busLines);
            fixture.detectChanges();

            const pills = fixture.debugElement.queryAll(By.directive(PillComponent));

            expect(pills.length).toBe(3);
            expect(pills[0].componentInstance.data().valueState).toBe('existing');
            expect(pills[1].componentInstance.data().valueState).toBe('missing');
        });

        it('should show empty state pill for empty bus array', async () => {
            fixture.componentRef.setInput('infos', {...defaultInfos, type: 'bus'});
            component.data$ = of([]);
            fixture.detectChanges();

            const pills = fixture.debugElement.queryAll(By.directive(PillComponent));
            expect(pills.length).toBe(1);
            expect(pills[0].componentInstance.data().valueState).toBe('empty');
        });

        it('should trigger loading state when data$ is null', async () => {
            fixture.componentRef.setInput('infos', {...defaultInfos, type: 'bus'});
            component.data$ = of(null);
            fixture.detectChanges();

            const pill = fixture.debugElement.query(By.directive(PillComponent)).componentInstance as PillComponent;
            expect(pill.loading()).toBe(true);
        });
    });

    describe('API Calls', () => {
        it('should call getBikesFromStation when type is "bikes"', async () => {
            const localFixture = TestBed.createComponent(TransportComponent);
            const bikeInfos: TransportInfos = {...defaultInfos, type: 'bikes', id: 'station-123'};
        
            localFixture.componentRef.setInput('infos', bikeInfos);
    
            localFixture.detectChanges();

            await firstValueFrom(localFixture.componentInstance.data$);

            expect(starServiceMock.getBikesFromStation).toHaveBeenCalledWith('station-123');
            expect(starServiceMock.getTimesFromBusLine).not.toHaveBeenCalled();
        });

        it('should call getTimesFromBusLine when type is "bus"', async () => {
            const localFixture = TestBed.createComponent(TransportComponent);
            const busInfos: TransportInfos = {...defaultInfos, type: 'bus', id: 'ligne-C1'};
        
            localFixture.componentRef.setInput('infos', busInfos);
        
            localFixture.detectChanges();

            await firstValueFrom(localFixture.componentInstance.data$);

            expect(starServiceMock.getTimesFromBusLine).toHaveBeenCalledWith(busInfos);
            expect(starServiceMock.getBikesFromStation).not.toHaveBeenCalled();
        });
    });
});