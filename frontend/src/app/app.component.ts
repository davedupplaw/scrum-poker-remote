import {Component, OnInit} from '@angular/core';
import {Session} from '../../../shared/domain/Session';
import {Registration} from '../../../shared/domain/Registration';
import {SocketService} from './socket.service';
import {MessageType} from '../../../shared/domain/MessageType';
import {Story} from '../../../shared/domain/Story';
import {Estimate} from '../../../shared/domain/Estimate';
import {EstimatedStory} from '../../../shared/domain/EstimatedStory';

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

  public me: Registration;
  public participants: Registration[] = [];
  public session: Session;
  public story: Story;
  public estimates: { [whom: string]: Estimate };
  public estimatedStories: {[storyId: string]: EstimatedStory };

  constructor(private socket: SocketService) {
  }

  ngOnInit() {
    const handlers: { [t: string]: (msg: any) => void } = {};
    handlers[MessageType.REGISTRATION] = (msg: any) => this.addRegistration(msg);
    handlers[MessageType.SESSION_START] = (msg: any) => this.sessionStart(msg);
    handlers[MessageType.SESSION_END] = (msg: any) => this.sessionEnd(msg);
    handlers[MessageType.ACTIVE_PARTICIPANTS] = (msg: any) => this.updateParticipants(msg);
    handlers[MessageType.DEREGISTRATION] = (msg: any) => this.userLeft(msg);
    handlers[MessageType.START_POKER] = (msg: any) => this.readyToStart(msg);
    handlers[MessageType.STORY_CHOSEN] = (msg: any) => this.storyChosen(msg);
    handlers[MessageType.ESTIMATE] = (msg: any) => this.receiveEstimate(msg);
    handlers[MessageType.ESTIMATED_STORY] = (msg: any) => this.estimatesChosen(msg);

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
   * @param registration The registration information
   */
  register(registration: Registration) {
    this.me = registration;
    this.socket.register(registration);
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
    this.socket.startPoker( this.session );
    this.estimatedStories = {};
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
      this.story = undefined;
      this.estimates = {};
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
    if (index !== -1 ) {
      this.participants.splice( index, 1 );
    }
  }

  /**
   * Called by the backend when the team is ready yo
   * start playing scrum poker
   * @param msg The StartPoker message
   */
  private readyToStart(msg: any) {
    this.awaitingPeople = false;
  }

  /**
   * Called by the backend when the facilitator wants the
   * team to estimate a story
   * @param msg The StoryChosen message
   */
  private storyChosen(msg: any) {
    this.story = new Story( msg._sessionId, msg._number, msg._title );
    this.estimates = {};
  }

  /**
   * Called when the facilitator uses the story-choose to
   * choose a story to estimate.
   * @param story The story to choose
   */
  chooseStory(story: Story) {
    this.socket.chooseStory( story );
  }

  /**
   * Called when a team member makes an estimate for a story
   * @param estimate The estimate made
   */
  estimateMade(estimate: string) {
    this.socket.estimate( new Estimate(this.me.id, estimate, this.story.number, this.session.id) );
  }

  /**
   * Called when the backend lets us know that an estimate
   * has been made for the current story
   * @param msg The Estimate message
   */
  private receiveEstimate(msg: any) {
    // TODO: check session/story
    this.estimates[ msg._whom ] = new Estimate(msg._whom, msg._estimate, msg._story, msg._sessionId);
  }

  numberOfParticipants() {
    return this.participants.length;
  }

  numberOfEstimates() {
    return Object.keys(this.estimates).length;
  }

  /**
   * Called when the backend acknowledges a complete poker game.
   * @param msg The message
   */
  estimatesChosen(msg: any) {
    // TODO: check session/story
    if ( this.isFacilitator ) {
      const est = {};
      Object.entries(msg._estimates).forEach( e => {
        const v = e[1] as any;
        est[e[0]] = new Estimate( v._whom, v._estimate, v._story, msg._sessionId );
      });

      this.estimatedStories[this.story.number] =
        new EstimatedStory( msg._sessionId,
          new Story( msg._sessionId, msg._story._number, msg._story._title ), est );
    }

    this.story = undefined;
    this.estimates = {};
  }

  /**
   * Called when the facilitator completes a poker game.
   */
  stopEstimationOnStory() {
    this.socket.finishEstimating( this.session.id, this.story, this.estimates );
  }
}
