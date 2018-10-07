import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-estimate-chooser',
  templateUrl: './estimate-chooser.component.html',
  styleUrls: ['./estimate-chooser.component.scss']
})
export class EstimateChooserComponent implements OnInit {

  @Input() choices: string[] = ['?', '1', '2', '3', '5', '8', '13', '20', '40', '100'];
  @Output() choose = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  makeChoice(estimate: string) {
    this.choose.emit(estimate);
  }
}
