import { RouteListenerComponent } from './router-listener.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, NavigationEnd, RouterEvent, NavigationCancel, NavigationError, NavigationStart } from '@angular/router';
import { ReplaySubject } from 'rxjs';

describe('Directive: ClickOutsideDirective', () => {
    let component: RouteListenerComponent;
    let fixture: ComponentFixture<RouteListenerComponent>;
    let methodSpy: jasmine.Spy;

    const eventSubject = new ReplaySubject<RouterEvent>(1);

    const routerMock = {
        navigate: jasmine.createSpy('navigate'),
        events: eventSubject.asObservable(),
        url: 'test/url'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RouteListenerComponent],
            providers: [
                {provide: Router, useValue: routerMock}
            ]
        });

        fixture = TestBed.createComponent(RouteListenerComponent);
        component = fixture.componentInstance;
        methodSpy = spyOn(component, 'promptWarning');
    });

    it('should not call warning method with end navigation event', () => {
        eventSubject.next(new NavigationEnd(1, 'regular', 'redirectUrl'));
        expect(methodSpy).not.toHaveBeenCalled();
    });

    it('should not call warning method with other navigation events', () => {
        eventSubject.next(new NavigationCancel(1, 'regular', 'redirectUrl'));
        eventSubject.next(new NavigationError(1, 'regular', 'redirectUrl'));
        eventSubject.next(new NavigationStart(1, 'regular'));
        expect(methodSpy).not.toHaveBeenCalled();
    });

    it('should call warning method with end navigation event', () => {
        eventSubject.next(new NavigationEnd(1, 'auth', 'redirectUrl'));
        expect(methodSpy).toHaveBeenCalledTimes(1);
    });
});
