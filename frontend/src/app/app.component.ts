import {Component, OnInit} from '@angular/core';
import {Session} from '../../../shared/domain/Session';
import {Registration} from "../../../shared/domain/Registration";
import {SocketService} from "./socket.service";
import {Message} from "../../../shared/domain/Message";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'app';
  public person = undefined;
  public planningStarted = false;
  public awaitingPeople = true;

  public session: Session;

  constructor(private socket: SocketService) {
  }

  ngOnInit() {
    this.socket.connect('http://localhost:3001')
      .asObservable()
      .subscribe( (message: any) => {
        console.log( `Received Message: ${message._type}`);
      });
  }

  updatePerson(person: string) {
    this.person = person;
  }

  startSession(session: Session) {
    this.session = session;
    this.planningStarted = true;

    this.socket.startSession( this.session );
  }

  register(register: Registration) {
    this.socket.register(register);
  }
}
