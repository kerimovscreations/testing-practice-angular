import { TestBed, inject } from '@angular/core/testing';
import { DateService } from './date.service';
import * as moment from 'moment';

describe('DateService', () => {
    const momentDescriptor = Object.getOwnPropertyDescriptor(window, 'moment');

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DateService]
        });
    });

    it('should be created', inject([DateService], (service: DateService) => {
        expect(service).toBeTruthy();
    }));

    it('should return correct date', inject([DateService], (service: DateService) => {

        // @ts-ignore
        moment.unix = jasmine.createSpy().and.callFake((input) => {
            return {
                format: (formatStr) => 'Formatted ' + input + ' as ' + formatStr
            };
        });

        expect(service.getFormattedDateFrom(123)).toEqual('Formatted 123 as MM-D-YYYY hh:mm a');
    }));
});
