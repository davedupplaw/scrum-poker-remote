import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Session} from '../../../../shared/domain/Session';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss']
})
export class SessionDetailsComponent implements OnInit {

  @Output() public session: EventEmitter<Session> = new EventEmitter<Session>();

  public newSession: Session = new Session('Planning Session', this.randomId());

  constructor() { }

  ngOnInit() {
  }

  private randomId() {
    return '1234';
  }

  submit() {
    console.log( this.newSession );
    this.session.emit( this.newSession );
  }
}
