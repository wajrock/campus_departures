import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {API_BASE_URL, API_KEY} from '../constants';
import {ApiBikeStation, ApiBusLine} from '../../shared/models/api.models';
import {map, Observable} from 'rxjs';
import {BikeStation, BusLine, TransportInfos} from '../../shared/models/models';

@Injectable({
    providedIn: 'root',
})
export class StarService {
    constructor(private http: HttpClient) { }

    getBikesFromStation(id: string): Observable<BikeStation | null> {
        return this.http.get<ApiBikeStation>(`${API_BASE_URL}/vls-stations-etat-tr/records?limit=1&refine=idstation%3A${id}&apikey=${API_KEY}`).pipe(
            map(data => {
                return data.total_count > 0 ? data.results[0] : null;
            })
        );
    }

    getTimesFromBusLine(infos: TransportInfos): Observable<BusLine[]> {
        return this.http.get<ApiBusLine>(`${API_BASE_URL}/tco-bus-circulation-passages-tr/records?order_by=depart&refine=idligne%3A${infos.id}&refine=sens%3A${infos.sens}&refine=nomarret%3A${infos.stop}&apikey=${API_KEY}`).pipe(
            map(data => {
                return data.total_count > 0 ? data.results : [];
            })
        );
    }
}
