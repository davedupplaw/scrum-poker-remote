import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ScrumModule} from './scrum/scrum.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ScrumModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
