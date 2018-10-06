import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdDisplayerComponent } from './id-displayer.component';

describe('IdDisplayerComponent', () => {
  let component: IdDisplayerComponent;
  let fixture: ComponentFixture<IdDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
