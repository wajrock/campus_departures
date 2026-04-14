import {Component, input} from '@angular/core';
import transportDetails from '../../../assets/transports-details.json';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {TransportComponent} from '../../shared/components/transport/transport.component';
import {SchoolDetails} from '../../shared/models/models';

@Component({
    selector: 'app-dashboard',
    imports: [TransportComponent, HeaderComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    nameSchool = input<string>();
    schoolDetails!: SchoolDetails;

    ngOnInit() {
        this.schoolDetails = (transportDetails as SchoolDetails[]).find((item) => item.schoolId === this.nameSchool())!;
    }
}
