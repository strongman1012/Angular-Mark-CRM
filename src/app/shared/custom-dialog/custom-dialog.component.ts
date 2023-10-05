import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'custom-dialog',
  templateUrl: './custom-dialog.component.html',
})
export class CustomDialogComponent implements OnInit {
  @Input() header: string = '';
  @Input() showCloseButton=true;


  constructor() {
  }

  ngOnInit(): void {

  }

}
