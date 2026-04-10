import {Component} from '@angular/core';
import transportDetails from '../../../assets/transports-details.json';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {TransportComponent} from '../../shared/components/transport/transport.component';

@Component({
    selector: 'app-dashboard',
    imports: [TransportComponent, HeaderComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    transportDetails = transportDetails;
}
