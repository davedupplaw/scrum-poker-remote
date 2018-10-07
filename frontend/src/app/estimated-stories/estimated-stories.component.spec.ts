import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedStoriesComponent } from './estimated-stories.component';

describe('EstimatedStoriesComponent', () => {
  let component: EstimatedStoriesComponent;
  let fixture: ComponentFixture<EstimatedStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimatedStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatedStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
