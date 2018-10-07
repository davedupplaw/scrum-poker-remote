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
  public isFacilitator: boolean;

  public participants: Registration[] = [];
  public session: Session;

  constructor(private socket: SocketService) {
  }

  ngOnInit() {
    const handlers: { [t: string]: (msg: any) => void } = {};
    handlers[MessageType.REGISTRATION] = (msg: any) => this.addRegistration(msg);
    handlers[MessageType.SESSION_START] = (msg: any) => this.sessionStart(msg);
    handlers[MessageType.SESSION_END] = (msg: any) => this.sessionEnd(msg);
    handlers[MessageType.ACTIVE_PARTICIPANTS] = (msg: any) => this.updateParticipants(msg);
    handlers[MessageType.DEREGISTRATION] = (msg: any) => this.userLeft(msg);

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

  /**
   * Called when a facilitator attempts to start a poker session (by
   * pressing the start session button on the session-details form).
   * This sends a message to the backend to start a session.
   *
   * @param session The session information
   */
  startSession(session: Session) {
    this.socket.startSession( session );
  }

  /**
   * Called when the user attempts to join a session (by pressing the join
   * button in the join form). This sends a message to the backend asking
   * to join.
   *
   * @param register The registration information
   */
  register(register: Registration) {
    this.socket.register(register);
  }

  /**
   * Called when the backend sends a new registration notification through
   * for the game the user is registered with.
   *
   * @param msg The Registration message
   */
  private addRegistration( msg: any ) {
    const registration = new Registration( msg._name, msg._email, msg._session, msg._id );
    this.participants.push(registration);
  }

  /**
   * Called immediately after registration, when the player
   * gets the information about the session they registered with.
   * After this they must wait until the facilitator starts the poker
   * game.
   *
   * @param msg The Session Start message
   */
  private sessionStart(msg: any) {
    this.session = new Session( msg._name, msg._id, msg._facilitator );

    this.awaitingPeople = true;
    this.planningStarted = false;
    this.isFacilitator = this.socket.isFacilitator( this.session.facilitator );
  }

  /**
   * This is called when the facilitator starts the poker session.
   */
  startPoker() {
    this.awaitingPeople = false;
  }

  /**
   * This is called when the backend tells us that the facilitator
   * has ended the session.
   *
   * @param msg The EndSession message
   */
  private sessionEnd(msg: any) {
    if ( msg.sessionId === this.session.id ) {
      this.session = undefined;
      this.planningStarted = false;
      this.awaitingPeople = true;
    }
  }

  /**
   * Called when the backend wants to update the frontend
   * about the participants in a session
   * @param msg The ActiveParticipants message
   */
  private updateParticipants(msg: any) {
    this.participants = msg.participants.map(o => new Registration(o._name, o._email, o._session, o._id));
  }

  /**
   * Called when the backend tells the frontend that a user
   * has left the session
   * @param msg The Deregistration message
   */
  private userLeft(msg: any) {
    const userId = msg.registration._id;
    const index = this.participants.findIndex(p => p.id === userId );
    this.participants.splice( index, 1 );
  }
}
