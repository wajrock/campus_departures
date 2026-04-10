import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {StarService} from './star.service';
import {API_BASE_URL, API_KEY} from '../constants';
import {TransportInfos} from '../../shared/models/models';
import {firstValueFrom} from 'rxjs';

describe('StarService', () => {
    let service: StarService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [StarService],
        });
        service = TestBed.inject(StarService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getBikesFromStation', () => {
        it('should return the first bike station record when results exist', async () => {
            const stationId = '5547';
            const mockResponse = {
                total_count: 1,
                results: [{idstation: '5547', nom: 'Test Station'}]
            };

            const requestPromise = firstValueFrom(service.getBikesFromStation(stationId));

            const req = httpMock.expectOne(req => req.url.includes(`idstation%3A${stationId}`));
            req.flush(mockResponse);

            const result = await requestPromise;
            expect(result?.idstation).toEqual(stationId);
        });

        it('should return null when total_count is 0', async () => {
            const stationId = '5547C';
            const mockResponse = {total_count: 0, results: []};

            const requestPromise = firstValueFrom(service.getBikesFromStation(stationId));

            const req = httpMock.expectOne(req => req.url.includes(`idstation%3A${stationId}`));
            req.flush(mockResponse);

            const result = await requestPromise;
            expect(result).toEqual(null);
        });
    });

    describe('getTimesFromBusLine', () => {
        const infos: TransportInfos = {
            id: 'C4',
            sens: 1,
            stop: 'Beaulieu INSA',
            type: 'bus',
            name: 'C4',
            icon: 'bus'
        };

        const url = `${API_BASE_URL}/tco-bus-circulation-passages-tr/records?order_by=depart&refine=idligne%3A${infos.id}&refine=sens%3A${infos.sens}&refine=nomarret%3A${infos.stop}&apikey=${API_KEY}`;

        it('should return a list of bus lines when records exist', async () => {
            const mockResponse = {
                total_count: 2,
                results: [
                    {idligne: 'C4', depart: '2026-04-09T10:00:00Z'},
                    {idligne: 'C4', depart: '2026-04-09T10:15:00Z'}
                ]
            };

            const requestPromise = firstValueFrom(service.getTimesFromBusLine(infos));

            const req = httpMock.expectOne(url);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);

            const result = await requestPromise;
            expect(result.length).toBe(2);
            expect(result).toEqual(mockResponse.results);
        });

        it('should return an empty array when total_count is 0', async () => {
            const mockResponse = {total_count: 0, results: []};

            const requestPromise = firstValueFrom(service.getTimesFromBusLine(infos));

            const req = httpMock.expectOne(url);
            req.flush(mockResponse);

            const result = await requestPromise;
            expect(result).toEqual([]);
        });
    });

    it('should handle HTTP error', async () => {
        const stationId = 'error';
        const requestPromise = firstValueFrom(service.getBikesFromStation(stationId));

        const req = httpMock.expectOne(req => req.url.includes('vls-stations-etat-tr'));
        req.flush('API Error', {status: 500, statusText: 'Server Error'});

        try {
            await requestPromise;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            expect(error.status).toBe(500);
        }
    });
});