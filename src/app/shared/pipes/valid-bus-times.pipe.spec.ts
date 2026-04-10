import {ValidBusTimesPipe} from './valid-bus-times.pipe';
import {BusLine} from '../models/models';

describe('ValidBusTimesPipe', () => {
    let pipe: ValidBusTimesPipe;
    const baseNow = new Date('2026-04-09T10:00:00.000Z');

    beforeEach(() => {
        pipe = new ValidBusTimesPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('filters out departures in the past or within 30 seconds', () => {
        const times: BusLine[] = [
            {depart: '2026-04-09T09:59:20.000Z', idligne: 'A', sens: 1},
            {depart: '2026-04-09T09:59:45.000Z', idligne: 'B', sens: 1},
            {depart: '2026-04-09T10:00:31.000Z', idligne: 'C', sens: 1},
        ];

        const result = pipe.transform(times, baseNow);

        expect(result).toEqual([
            {depart: '2026-04-09T10:00:31.000Z', idligne: 'C', sens: 1},
        ]);
    });

    it('sorts departures by ascending time and returns only unique departures', () => {
        const times: BusLine[] = [
            {depart: '2026-04-09T10:10:00.000Z', idligne: '1', sens: 1},
            {depart: '2026-04-09T10:05:00.000Z', idligne: '2', sens: 1},
            {depart: '2026-04-09T10:05:00.000Z', idligne: '2', sens: 1},
            {depart: '2026-04-09T10:15:00.000Z', idligne: '3', sens: 1},
        ];

        const result = pipe.transform(times, baseNow);

        expect(result).toEqual([
            {depart: '2026-04-09T10:05:00.000Z', idligne: '2', sens: 1},
            {depart: '2026-04-09T10:10:00.000Z', idligne: '1', sens: 1},
            {depart: '2026-04-09T10:15:00.000Z', idligne: '3', sens: 1},
        ]);
    });

    it('returns only the first three departures after filtering and sorting', () => {
        const times: BusLine[] = [
            {depart: '2026-04-09T10:03:00.000Z', idligne: 'A', sens: 1},
            {depart: '2026-04-09T10:04:00.000Z', idligne: 'B', sens: 1},
            {depart: '2026-04-09T10:05:00.000Z', idligne: 'C', sens: 1},
            {depart: '2026-04-09T10:06:00.000Z', idligne: 'D', sens: 1},
        ];

        const result = pipe.transform(times, baseNow);

        expect(result.length).toBe(3);
        expect(result).toEqual([
            {depart: '2026-04-09T10:03:00.000Z', idligne: 'A', sens: 1},
            {depart: '2026-04-09T10:04:00.000Z', idligne: 'B', sens: 1},
            {depart: '2026-04-09T10:05:00.000Z', idligne: 'C', sens: 1},
        ]);
    });

    it('returns an empty array when no departures remain after filtering', () => {
        const times: BusLine[] = [
            {depart: '2026-04-09T09:59:50.000Z', idligne: 'X', sens: 1},
            {depart: '2026-04-09T10:00:20.000Z', idligne: 'Y', sens: 1},
        ];

        const result = pipe.transform(times, baseNow);

        expect(result).toEqual([]);
    });
});
