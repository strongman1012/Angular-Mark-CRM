import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {

  constructor() {
  }

  public matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => !!control.parent &&
    !!control.parent.value &&
    control.value === control.parent.controls[matchTo].value
        ? null
        : {isMatching: false};
  }
}
