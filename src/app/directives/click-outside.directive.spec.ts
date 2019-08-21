import { ClickOutsideDirective } from './click-outside.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';

@Component({
    template: `
    <div #parentElem (appClickOutside)='onOutsideClick()'>
        <div #childElem>inside element</div>
    </div>
    <div #outerElem>outside element</div>`
})
class TestClickOutsideComponent {
    @ViewChild('childElem') childElem: ElementRef;
    @ViewChild('parentElem') parentElem: ElementRef;
    @ViewChild('outerElem') outerElem: ElementRef;

    onOutsideClick(): boolean {
        return true;
    }
}

describe('Directive: ClickOutsideDirective', () => {
    let component: TestClickOutsideComponent;
    let fixture: ComponentFixture<TestClickOutsideComponent>;
    let methodSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ClickOutsideDirective, TestClickOutsideComponent]
        });

        fixture = TestBed.createComponent(TestClickOutsideComponent);
        component = fixture.componentInstance;
        methodSpy = spyOn(component, 'onOutsideClick');
    });

    it('should not fire when click on observed parent element', () => {
        component.parentElem.nativeElement.click();
        fixture.detectChanges();

        expect(methodSpy).not.toHaveBeenCalled();
    });

    it('should not fire when click on observed child element', () => {
        component.childElem.nativeElement.click();
        fixture.detectChanges();

        expect(methodSpy).not.toHaveBeenCalled();
    });

    it('should fire when click on outer element', () => {
        component.outerElem.nativeElement.click();
        fixture.detectChanges();

        expect(methodSpy).toHaveBeenCalledTimes(1);
    });
});
