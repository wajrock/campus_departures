import {Routes} from '@angular/router';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {SchoolsComponent} from './features/schools/schools.component';

export const routes: Routes = [
    {path: '', component: SchoolsComponent},
    {path: '/:nameSchool', component: DashboardComponent},
    {path: '**', redirectTo: ''}
];
    