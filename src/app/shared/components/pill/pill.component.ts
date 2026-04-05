import {Component, input} from '@angular/core';

@Component({
    selector: 'app-pill',
    imports: [],
    templateUrl: './pill.component.html',
    styleUrl: './pill.component.scss',
})
export class PillComponent {
    text = input.required<string>();
    loading = input<boolean>(false);
}
