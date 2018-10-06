import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import {Registration} from '../../../shared/domain/Registration';
import {Session} from '../../../shared/domain/Session';
import * as uuidv4 from 'uuid/v4';

@Injectable()
export class SocketService {
  private ws: WebSocket;
  private uuid = uuidv4();

  constructor() {
    this.connect('ws://localhost:3001');
  }

  private subject: Subject<MessageEvent>;

  /**
   * Returns a connection to the backend
   * @param url The URL to connect to
   */
  public connect(url): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  private create(url): Subject<MessageEvent> {
    this.ws = new WebSocket(url);

    const observable = Observable.create(
      (obs: Observer<any>) => {
        this.ws.onmessage = (m => obs.next(JSON.parse(m.data)));
        this.ws.onerror = obs.error.bind(obs);
        this.ws.onclose = obs.complete.bind(obs);
        return this.ws.close.bind(this.ws);
      });

    const observer = {
      next: (data: Object) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }

  /**
   * Send a registration message to the backend
   * @param registration The registration message
   */
  public register(registration: Registration) {
    registration.id = this.uuid;
    this.ws.send(JSON.stringify(registration));
  }

  /**
   * Sends a start session message to the backend
   * @param session The session message
   */
  public startSession(session: Session) {
    this.ws.send(JSON.stringify(session));
  }
}
