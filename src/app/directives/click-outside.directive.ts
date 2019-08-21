import { Directive, ElementRef, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
    selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

    constructor(private elementRef: ElementRef) { }

    @Output()
    public appClickOutside = new EventEmitter();

    @HostListener('document:click', ['$event.target'])

    public onClick(targetElement) {
        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.appClickOutside.emit(null);
        }
    }
}
