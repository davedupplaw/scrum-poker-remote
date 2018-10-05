import {Component, OnInit} from '@angular/core';
import {Registration} from '../../../../shared/domain/Registration';
import {SocketService} from '../socket.service';

@Component({
  selector: 'app-join-form',
  templateUrl: './join-form.component.html',
  providers: [SocketService],
  styleUrls: ['./join-form.component.scss']
})
export class JoinFormComponent implements OnInit {

  public registration: Registration = new Registration('', '');

  constructor(private socket: SocketService) {
  }

  ngOnInit() {
  }

  submit(registrationValue: Registration) {
    console.log('Submit', registrationValue);
    this.socket.register(registrationValue);
    return false;
  }

}
