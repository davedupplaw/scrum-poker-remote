import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerBoardComponent } from './poker-board.component';

describe('PokerBoardComponent', () => {
  let component: PokerBoardComponent;
  let fixture: ComponentFixture<PokerBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokerBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
