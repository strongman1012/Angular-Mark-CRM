import {Pipe, PipeTransform} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Pipe({
  name: 'validation',
  pure: true,
})
export class ValidationPipe implements PipeTransform {

  transform(field: AbstractControl, ...args: object[]): string {
    const errors = field.errors;

    if (errors == null) {
      return '';
    } else if (errors.minlength !== undefined &&
        errors.minlength.requiredLength > errors.minlength.actualLength) {
      return 'Min length should be ' + errors.minlength.requiredLength + '.';
    } else if (errors.required !== undefined) {
      return 'This field is required.';
    } else if (errors.maxlength !== undefined &&
        errors.maxlength.requiredLength > errors.maxlength.actualLength) {
      return 'Max length should be ' + errors.maxlength.requiredLength + '.';
    } else if (errors.email !== undefined) {
      return 'Email address is invalid.';
    } else if (errors.pattern !== undefined) {
      return 'Invalid format.';
    } else {
      return '';
    }
  }

}
