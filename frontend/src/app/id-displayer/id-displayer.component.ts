import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../../../../shared/domain/Session';

@Component({
  selector: 'app-id-displayer',
  templateUrl: './id-displayer.component.html',
  styleUrls: ['./id-displayer.component.scss']
})
export class IdDisplayerComponent implements OnInit {
  @Input() public session: Session;

  constructor() { }

  ngOnInit() {
  }
}
