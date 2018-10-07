import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Story} from '../../../../shared/domain/Story';
import {Session} from '../../../../shared/domain/Session';

@Component({
  selector: 'app-story-chooser',
  templateUrl: './story-chooser.component.html',
  styleUrls: ['./story-chooser.component.scss']
})
export class StoryChooserComponent implements OnInit {
  @Input() session: Session;
  @Output() choose = new EventEmitter<Story>();

  public story: Story;

  constructor() { }

  ngOnInit() {
    this.story = new Story(this.session.id, '', '');
  }

  startEstimation() {
    console.log( this.story );
    this.choose.emit(this.story);
  }
}
