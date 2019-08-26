import { Injectable } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IStatusResponse } from '../models/response';
import { map } from 'rxjs/operators';

@Injectable()
export class StatusService {

    private timerSub: Subscription;

    constructor(private http: HttpClient) {
    }

    startPeriodicCheck() {
        if (this.timerSub !== undefined) {
            this.stopPeriodicCheck();
        }

        this.timerSub = timer(10000, 10000).subscribe(_ => {
            this.getServiceStatus().subscribe(data => {
                if (data.status === 200) {
                    this.printConsole('success');
                } else {
                    this.printConsole('error');
                }
            });
        });
    }

    stopPeriodicCheck() {
        this.timerSub.unsubscribe();
    }

    getServiceStatus(): Observable<IStatusResponse> {
        return this.http.get<IStatusResponse>(
            'https://demo1734473.mockable.io/ping'
        ).pipe(map((response: IStatusResponse) => {
            return response;
        }));
    }

    printConsole(text: string) {
        console.log(text);
    }
}

