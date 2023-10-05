import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {

  constructor() {
  }

  public validateAllFields(formGroup: FormGroup, error: HttpErrorResponse) {
    if (error.status !== 400) {
      return;
    }
    const errors = error.error.data;
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl && errors[field] !== undefined) {
        control.updateValueAndValidity();
        control.setErrors({serverError: errors[field]});
      } else if (control instanceof FormGroup) {
        return this.validateAllFields(control, errors);
      }
    });
  }
}
