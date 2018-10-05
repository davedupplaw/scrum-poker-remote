import {Component, OnInit} from '@angular/core';
import {StoreService} from '../store.service';
import {Registration} from '../../../../shared/domain/Registration';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  providers: [StoreService],
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {
  public participants: Registration[];

  constructor(public store: StoreService) {
  }

  ngOnInit() {
  }
}
