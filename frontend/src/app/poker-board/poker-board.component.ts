import {Component, Input, OnInit} from '@angular/core';
import {Story} from '../../../../shared/domain/Story';
import {Estimate} from '../../../../shared/domain/Estimate';
import {Registration} from '../../../../shared/domain/Registration';

@Component({
  selector: 'app-poker-board',
  templateUrl: './poker-board.component.html',
  styleUrls: ['./poker-board.component.scss']
})
export class PokerBoardComponent implements OnInit {
  @Input() story: Story;
  @Input() estimates: { [whom: string]: Estimate };
  @Input() participants: Registration[];

  constructor() { }

  ngOnInit() {
  }

  estimatesFrom() {
    return Object.keys(this.estimates);
  }
}
