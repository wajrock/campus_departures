import {TestBed} from '@angular/core/testing';
import {DisplayInformationPillPipe} from './display-information-pill.pipe';
import {TimeService} from '../../core/time.service';
import {PillData} from '../models/models';

class MockTimeService {
    currentTime = () => new Date('2026-04-09T10:00:00.000Z');
}

describe('DisplayInformationPillPipe', () => {
    let pipe: DisplayInformationPillPipe;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                DisplayInformationPillPipe,
                {provide: TimeService, useClass: MockTimeService},
            ],
        }).compileComponents();

        pipe = TestBed.inject(DisplayInformationPillPipe);
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('returns a dash when valueState is missing', () => {
        const data: PillData = {
            value: '',
            type: 'bus',
            valueState: 'missing',
        };

        expect(pipe.transform(data)).toBe('-');
    });

    it('formats bike values with plural when greater than 1', () => {
        const data: PillData = {
            value: 2,
            type: 'bikes',
            valueState: 'existing',
        };

        expect(pipe.transform(data)).toBe('2 vélos');
    });

    it('formats bike value singular when equal to 1', () => {
        const data: PillData = {
            value: 1,
            type: 'bikes',
            valueState: 'existing',
        };

        expect(pipe.transform(data)).toBe('1 vélo');
    });

    it('returns no trips text when bus valueState is empty', () => {
        const data: PillData = {
            value: '',
            type: 'bus',
            valueState: 'empty',
        };

        expect(pipe.transform(data)).toBe('Aucun trajets');
    });

    it('returns < 1 min when bus departure is under 1 minute', () => {
        const data: PillData = {
            value: '2026-04-09T10:00:30.000Z',
            type: 'bus',
            valueState: 'existing',
        };

        expect(pipe.transform(data)).toBe('< 1 min');
    });

    it('returns rounded minutes when bus departure is between 1 and 59 minutes', () => {
        const data: PillData = {
            value: '2026-04-09T10:25:00.000Z',
            type: 'bus',
            valueState: 'existing',
        };

        expect(pipe.transform(data)).toBe('25 min');
    });

    it('returns hour:minute format when bus departure is 60 minutes or more in correct timezone', () => {
        const data: PillData = {
            value: '2026-04-09T11:05:00.000Z',
            type: 'bus',
            valueState: 'existing',
        };

        expect(pipe.transform(data)).toBe('13h05');
    });
});
