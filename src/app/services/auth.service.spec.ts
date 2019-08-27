import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { PostBody } from '../models/post-body';
import { HttpRequest } from '@angular/common/http';
import { StatusResponse } from '../models/response';
import { finalize } from 'rxjs/operators';

describe('AuthService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [AuthService]
        });
    });

    afterEach(inject([HttpTestingController],
        (backend: HttpTestingController) => {
            backend.verify();
        })
    );

    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));

    it('should logout', inject([AuthService, Router],
        (authService: AuthService, router: Router) => {
            const routerSpy = spyOn(router, 'navigate');
            const methodSpy = spyOn(authService, 'clearUserData');

            authService.logout();

            expect(methodSpy).toHaveBeenCalledTimes(1);
            expect(routerSpy).toHaveBeenCalledWith(['/login']);
        }));

    it('should clear user data successful', inject([AuthService, HttpTestingController],
        (authService: AuthService, backend: HttpTestingController) => {

            const mockResponse = new StatusResponse(200, 'Success');
            const formData = new PostBody('username');

            authService.clearUserData(formData).subscribe(data => {
                expect(data).toEqual(mockResponse);
            });

            backend.expectOne((request: HttpRequest<any>) => {
                return request.method === 'POST'
                    && request.url === 'https://demo1734473.mockable.io/logout'
                    && JSON.stringify(request.body) === JSON.stringify(formData);
            }).flush(mockResponse);
        }));

    it('should get user data unsuccessfully', inject([AuthService, HttpTestingController],
        (authService: AuthService, backend: HttpTestingController) => {

            const errObj = new ErrorEvent('Network error');
            const errMethodSpy = spyOn(authService, 'printError');

            authService.getUserData();

            backend.expectOne((request: HttpRequest<any>) => {
                return request.method === 'GET'
                    && request.url === 'https://demo1734473.mockable.io/user';
            }).error(errObj);

            expect(errMethodSpy).toHaveBeenCalledTimes(1);
        }));
});
