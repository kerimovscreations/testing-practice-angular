import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { RouteListenerComponent } from './components/router-listener/router-listener.component';
import { NumberPickerComponent } from './components/number-picker/number-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    RouteListenerComponent,
    ClickOutsideDirective,
    NumberPickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
