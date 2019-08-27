import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateService {

    getFormattedDateFrom(timestamp: number): string {
        return moment.unix(timestamp).format('MM-D-YYYY hh:mm a');
    }
}
