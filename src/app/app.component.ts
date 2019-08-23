import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private title = 'practical-test-app';

  constructor() {
    console.log(this.getTitle());
  }

  private getTitle(): string {
    return this.title;
  }
}
