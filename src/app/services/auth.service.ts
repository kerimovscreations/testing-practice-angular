import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {

    private isUserLoggedInBSubject$ = new BehaviorSubject<boolean>(false);

    getIsUserLoggedIn$(): Observable<boolean> {
        return this.isUserLoggedInBSubject$.asObservable();
    }
}
