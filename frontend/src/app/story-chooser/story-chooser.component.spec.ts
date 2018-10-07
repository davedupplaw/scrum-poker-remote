import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryChooserComponent } from './story-chooser.component';

describe('StoryChooserComponent', () => {
  let component: StoryChooserComponent;
  let fixture: ComponentFixture<StoryChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
