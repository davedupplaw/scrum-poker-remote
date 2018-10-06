import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-role-chooser',
  templateUrl: './role-chooser.component.html',
  styleUrls: ['./role-chooser.component.scss']
})
export class RoleChooserComponent implements OnInit {

  @Output() person: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  choose(person: string) {
    this.person.emit(person);
  }
}
