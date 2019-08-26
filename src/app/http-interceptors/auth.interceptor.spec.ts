import { TestBed, async, inject } from '@angular/core/testing';
import { HttpRequest, HttpSentEvent, HttpEventType } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthenticationInterceptor } from './auth.interceptor';

describe('AuthenticationInterceptor', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ AuthenticationInterceptor ]
        });
    }));

    it('should intercept successfully', inject([AuthenticationInterceptor],
        (interceptor: AuthenticationInterceptor) => {

            const outputCheck = { type: HttpEventType.Sent } as HttpSentEvent;
            const request = new HttpRequest('GET', 'mockUrl');
            const handler = {
                handle: (req: HttpRequest<any>) => {
                    expect(req.url).toEqual('mockUrl');
                    expect(req.headers.get('Authorization')).toEqual('auth-123456');
                    return of(outputCheck);
                }
            };

            interceptor.intercept(request, handler)
                .subscribe(data => {
                    expect(data).toEqual(outputCheck);
                });
        }));
});
