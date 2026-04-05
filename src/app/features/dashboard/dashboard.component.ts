import {Component, inject} from '@angular/core';
import {StarService} from '../../core/star/star.service';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {TransportComponent} from '../../shared/components/transport/transport.component';

@Component({
    selector: 'app-dashboard',
    imports: [TransportComponent, HeaderComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
    private starService = inject(StarService);
}
