import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'form-error-confirm-password',
  templateUrl: './form-error-confirm-password.component.html',
  styleUrls: ['./form-error-confirm-password.component.scss'],
})
export class FormErrorConfirmPasswordComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() name: string;
  @Input() password: string;

  constructor() {
  }

  ngOnInit(): void {

  }

}
