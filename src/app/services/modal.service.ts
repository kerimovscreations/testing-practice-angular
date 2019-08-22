import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { IModalData, ModalData, ModalType } from '../models/modal';

@Injectable()
export class ModalService {

    showModalSubject = new Subject<IModalData>();

    constructor(private authService: AuthService) {
        this.subscribeLoginStatus();
    }

    subscribeLoginStatus(): void {
        this.authService.getIsUserLoggedIn$()
            .subscribe(loggedIn => {
                if (loggedIn) {
                    this.showModal(new ModalData(ModalType.TYPE_1));
                }
            });
    }

    getShowModalSubject$(): Observable<IModalData> {
        return this.showModalSubject.asObservable();
    }

    showModal(type: IModalData) {
        this.showModalSubject.next(type);
    }
}

