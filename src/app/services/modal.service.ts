import { IModalData, ModalData, ModalType } from '../models/modal';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class ModalService {

    showModalSubject = new Subject<IModalData>();

    constructor(private authService: AuthService) {
        this.subscribeLoginStatus();
    }

    subscribeLoginStatus(): void {
        this.authService.getIsUserLoggedIn$()
            .pipe(finalize(() => {
                this.onComplete();
            }))
            .subscribe(loggedIn => {
                if (loggedIn) {
                    this.showModal(new ModalData(ModalType.TYPE_1));
                }
            }, err => {
                this.printText(err.text);
            });
    }

    printText(text: string) {
        console.log(text);
    }

    onComplete() {
        console.log('Completed');
    }

    getShowModalSubject$(): Observable<IModalData> {
        return this.showModalSubject.asObservable();
    }

    showModal(type: IModalData) {
        this.showModalSubject.next(type);
    }
}

