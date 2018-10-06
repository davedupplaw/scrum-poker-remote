import {Component, OnInit} from '@angular/core';
import {Session} from '../../../shared/domain/Session';
import {Registration} from '../../../shared/domain/Registration';
import {SocketService} from './socket.service';
import {MessageType} from '../../../shared/domain/MessageType';

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

  public participants: Registration[] = [];
  public session: Session;

  constructor(private socket: SocketService) {
  }

  ngOnInit() {
    const handlers: { [t: string]: (msg: any) => void } = {};
    handlers[MessageType.REGISTRATION] = (msg: any) => this.addRegistration(msg);

    this.socket.connect('http://localhost:3001')
      .asObservable()
      .subscribe( (message: any) => {
        if (handlers[message._type]) {
          handlers[message._type](message);
        }
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

  private addRegistration( msg: any ) {
    const registration = new Registration( msg._name, msg._email, msg._session, msg._id );
    this.participants.push(registration);
  }
}
