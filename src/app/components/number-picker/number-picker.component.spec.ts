import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberPickerComponent } from './number-picker.component';
import { By } from '@angular/platform-browser';

describe('DatePickerComponenr', () => {
    let component: NumberPickerComponent;
    let fixture: ComponentFixture<NumberPickerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NumberPickerComponent]
        });

        fixture = TestBed.createComponent(NumberPickerComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should assign valid css class', () => {
        component.isValueValid = true;

        fixture.detectChanges();

        expect(component.parentDiv.nativeElement.classList.contains('valid')).toEqual(true);
        expect(component.parentDiv.nativeElement.classList.contains('invalid')).toEqual(false);
    });

    it('should assign invalid css class', () => {
        component.isValueValid = false;

        fixture.detectChanges();

        expect(component.parentDiv.nativeElement.classList.contains('valid')).toEqual(false);
        expect(component.parentDiv.nativeElement.classList.contains('invalid')).toEqual(true);
    });

    it('should set correct background color when valid', () => {
        component.isValueValid = true;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('#input-wrapper')).nativeElement.style.marginBottom).toEqual('10px');
    });

    it('should set correct background color when invalid', () => {
        component.isValueValid = false;

        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('#input-wrapper')).nativeElement.style.marginBottom).toEqual('0px');
    });

    it('should show list with valid input', () => {
        component.inputElem.nativeElement.value = 6;
        component.inputElem.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        const listItemCount = fixture.debugElement.queryAll(By.css('.list-item')).length;

        expect(component.isValueValid).toEqual(true);
        expect(listItemCount).toEqual(6);
    });

    it('should not show list with valid input', () => {
        component.inputElem.nativeElement.value = 4;
        component.inputElem.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        const listItemCount = fixture.debugElement.queryAll(By.css('.list-item')).length;

        expect(component.isValueValid).toEqual(false);
        expect(listItemCount).toEqual(0);
    });
});
