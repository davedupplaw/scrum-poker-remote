import {Component, Input, OnInit} from '@angular/core';
import {EstimatedStory} from '../../../../shared/domain/EstimatedStory';

@Component({
  selector: 'app-estimated-stories',
  templateUrl: './estimated-stories.component.html',
  styleUrls: ['./estimated-stories.component.scss']
})
export class EstimatedStoriesComponent implements OnInit {
  @Input() estimatedStories: { [storyId: string]: EstimatedStory };

  constructor() {
  }

  ngOnInit() {
  }

  storyIds(): string[] {
    return Object.keys(this.estimatedStories);
  }

  whoPartook(storyId: string) {
    return Object.keys(this.estimatedStories[storyId].estimates);
  }

  averageSize(storyId: string): number {
    const whoVoted = Object.keys(this.estimatedStories[storyId].estimates);
    const estimates = whoVoted.map(w => parseInt(this.estimatedStories[storyId].estimates[w].estimate, 10))
                              .filter( n => !isNaN(n) );
    return estimates.reduce((a, b) => a + b) / estimates.length;
  }
}
