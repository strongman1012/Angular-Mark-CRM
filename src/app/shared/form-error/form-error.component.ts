import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;

  constructor() {
  }

  ngOnInit(): void {

  }

}
