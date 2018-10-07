import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateChooserComponent } from './estimate-chooser.component';

describe('EstimateChooserComponent', () => {
  let component: EstimateChooserComponent;
  let fixture: ComponentFixture<EstimateChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimateChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
