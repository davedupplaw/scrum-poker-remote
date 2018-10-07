import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ParticipantListComponent} from '../participant-list/participant-list.component';
import {JoinFormComponent} from '../join-form/join-form.component';
import {RoleChooserComponent} from '../role-chooser/role-chooser.component';
import {IdDisplayerComponent} from '../id-displayer/id-displayer.component';
import {SessionDetailsComponent} from '../session-details/session-details.component';
import {PokerBoardComponent} from '../poker-board/poker-board.component';
import {StoryChooserComponent} from '../story-chooser/story-chooser.component';
import {EstimateChooserComponent} from '../estimate-chooser/estimate-chooser.component';
import {EstimatedStoriesComponent} from '../estimated-stories/estimated-stories.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    ParticipantListComponent,
    JoinFormComponent,
    RoleChooserComponent,
    IdDisplayerComponent,
    SessionDetailsComponent,
    PokerBoardComponent,
    StoryChooserComponent,
    EstimateChooserComponent,
    EstimatedStoriesComponent
  ],
  declarations: [
    ParticipantListComponent,
    JoinFormComponent,
    RoleChooserComponent,
    IdDisplayerComponent,
    SessionDetailsComponent,
    PokerBoardComponent,
    StoryChooserComponent,
    EstimateChooserComponent,
    EstimatedStoriesComponent
  ]
})
export class ScrumModule {
}
