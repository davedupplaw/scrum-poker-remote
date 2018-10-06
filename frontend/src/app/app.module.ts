import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ScrumModule} from './scrum/scrum.module';
import {SocketService} from "./socket.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ScrumModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
