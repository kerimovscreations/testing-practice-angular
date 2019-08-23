import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IStatusResponse } from '../models/response';
import { map } from 'rxjs/operators';
import { IPostBody, PostBody } from '../models/post-body';

@Injectable()
export class AuthService {

    private isUserLoggedInBSubject$ = new BehaviorSubject<boolean>(false);

    constructor(
        private http: HttpClient,
        private router: Router) {
    }

    getIsUserLoggedIn$(): Observable<boolean> {
        return this.isUserLoggedInBSubject$.asObservable();
    }

    setIsUserLoggedIn$(state: boolean): void {
        this.isUserLoggedInBSubject$.next(state);
    }

    logout(): void {
        this.clearUserData(new PostBody('username'));
        this.router.navigate(['/login']);
    }

    clearUserData(formData: IPostBody): Observable<IStatusResponse> {
        return this.http.post<IStatusResponse>(
            'https://demo1734473.mockable.io/logout', formData
        ).pipe(map((response: IStatusResponse) => {
            return response;
        }));
    }
}

