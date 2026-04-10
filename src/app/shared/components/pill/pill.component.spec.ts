import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PillComponent} from './pill.component';
import {PillData} from '../../models/models';
import {signal} from '@angular/core';

describe('PillComponent', () => {
    let component: PillComponent;
    let fixture: ComponentFixture<PillComponent>;
    const pillData: PillData = {
        value: 'test',
        type: 'metro',
        valueState: 'existing',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PillComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PillComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('data', pillData);
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize data input correctly', () => {
        expect(component.data()).toEqual(pillData);
    });

    it('should render pill content in the template', () => {
        fixture.detectChanges();
        const pillElement = fixture.nativeElement.querySelector('.pill-wrapper');
        expect(pillElement.textContent).toContain('test');
    });

    it('should apply loading class when loading is true', () => {
        fixture.componentRef.setInput('loading', true);
        fixture.detectChanges();
        const pillElement = fixture.nativeElement.querySelector('.pill-wrapper');
        expect(pillElement.classList).toContain('loading');
    });

    it('should apply inactive class when inactive is true', () => {
        fixture.componentRef.setInput('inactive', true);
        fixture.detectChanges();
        const pillElement = fixture.nativeElement.querySelector('.pill-wrapper');
        expect(pillElement.classList).toContain('inactive');
    });

    it('should apply urgent class when isUrgent is true', () => {
        component.timeService.currentTime = signal(new Date('2026-04-09T10:00:00.000Z'));
        const urgentData: PillData = {
            value: '2026-04-09T10:00:30.000Z',
            type: 'bus',
            valueState: 'existing',
        };
        fixture.componentRef.setInput('data', urgentData);
        fixture.detectChanges();
        const pillElement = fixture.nativeElement.querySelector('.pill-wrapper');
        expect(pillElement.classList).toContain('urgent');
    });

    it('should not apply urgent class when isUrgent is false', () => {
        fixture.detectChanges();
        const pillElement = fixture.nativeElement.querySelector('.pill-wrapper');
        expect(pillElement.classList).not.toContain('urgent');
    });
});
