import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Registration} from '../../../../shared/domain/Registration';
import {SocketService} from '../socket.service';

@Component({
  selector: 'app-join-form',
  templateUrl: './join-form.component.html',
  providers: [SocketService],
  styleUrls: ['./join-form.component.scss']
})
export class JoinFormComponent implements OnInit {

  @Output() register = new EventEmitter<Registration>();

  public registration: Registration = new Registration('', '', '', '');

  constructor() {
  }

  ngOnInit() {
  }

  submit() {
    console.log('Submit', this.registration);
    this.register.emit(this.registration);
  }
}
