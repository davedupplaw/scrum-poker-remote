import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParticipantListComponent} from '../participant-list/participant-list.component';
import {JoinFormComponent} from '../join-form/join-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RoleChooserComponent} from '../role-chooser/role-chooser.component';
import {IdDisplayerComponent} from '../id-displayer/id-displayer.component';
import {SessionDetailsComponent} from '../session-details/session-details.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ParticipantListComponent, JoinFormComponent, RoleChooserComponent, IdDisplayerComponent, SessionDetailsComponent],
  declarations: [ParticipantListComponent, JoinFormComponent, RoleChooserComponent, IdDisplayerComponent, SessionDetailsComponent]
})
export class ScrumModule {
}
