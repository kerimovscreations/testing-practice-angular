import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-route-listener',
    template: `<h1>Routing listener</h1>`,
    styles: ['']
})
export class RouteListenerComponent {

    constructor(private router: Router) {
        this.subscribeToRouterEvents();
    }

    subscribeToRouterEvents() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (event.url.includes('auth')) {
                    this.promptWarning();
                }
            }
        });
    }

    promptWarning() {
        console.log('Warning! Not allowed url');
    }
}
