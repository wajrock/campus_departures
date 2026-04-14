import {Component} from '@angular/core';
import transportDetails from '../../../assets/transports-details.json';

@Component({
    selector: 'app-schools',
    imports: [],
    templateUrl: './schools.component.html',
    styleUrl: './schools.component.scss',
})
export class SchoolsComponent {
    transportDetails = transportDetails;
}
