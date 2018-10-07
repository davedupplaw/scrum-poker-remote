import {Component, Input, OnInit} from '@angular/core';
import {EstimatedStory} from '../app.component';

@Component({
  selector: 'app-estimated-stories',
  templateUrl: './estimated-stories.component.html',
  styleUrls: ['./estimated-stories.component.scss']
})
export class EstimatedStoriesComponent implements OnInit {
  @Input() estimatedStories: {[storyId: string]: EstimatedStory};

  constructor() { }

  ngOnInit() {
  }

  storyIds() {
    return Object.keys(this.estimatedStories);
  }
}
