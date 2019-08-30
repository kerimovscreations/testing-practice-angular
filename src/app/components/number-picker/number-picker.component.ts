import { Component, ViewChild, ElementRef } from '@angular/core';
import { ListItem } from 'src/app/models/list-item';

@Component({
    selector: 'app-number-picker',
    templateUrl: './number-picker.component.html',
    styleUrls: ['./number-picker.component.css']
})
export class NumberPickerComponent {

    isValueValid = true;
    elementCount = 0;
    items: ListItem[] = [];

    @ViewChild('parentDiv') parentDiv: ElementRef;
    @ViewChild('inputElem') inputElem: ElementRef;

    onInputChange(value: number) {
        this.elementCount = value;
        this.isValueValid = this.elementCount > 5;

        if (this.isValueValid) {
            this.items = [];
            for (let i = 0; i < this.elementCount; ++i) {
                this.items.push(new ListItem('Title ' + i));
            }
        }
    }
}

