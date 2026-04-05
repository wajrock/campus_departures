import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {API_BASE_URL, API_KEY} from '../constants';
import {ApiBikeStation} from '../../shared/models/api.models';
import {map} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StarService {
    constructor(private http: HttpClient) { }

    getBikeStation(id: number) {
        return this.http.get<ApiBikeStation>(`${API_BASE_URL}/vls-stations-etat-tr/records?limit=1&refine=idstation%3A${id}&api_key=${API_KEY}`).pipe(
            map(data => {
                return data.total_count > 0 ? data.results[0] : null;
            })
        );
    }
}
