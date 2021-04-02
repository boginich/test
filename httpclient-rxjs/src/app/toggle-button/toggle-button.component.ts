import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {
  // @Output() changed = new EventEmitter<boolean>();
  @Output() changed$ = new Subject<boolean>();
  checked = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onChanged(event: Event) {
    this.checked = !this.checked;
    this.changed$.next(this.checked);
    // this.changed.emit(this.checked);
  }
}
