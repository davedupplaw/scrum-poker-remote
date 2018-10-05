import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParticipantListComponent} from '../participant-list/participant-list.component';
import {JoinFormComponent} from '../join-form/join-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ParticipantListComponent, JoinFormComponent],
  declarations: [ParticipantListComponent, JoinFormComponent]
})
export class ScrumModule {
}
