import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Pipe({
  name: 'confirmPasswordValidation',
  pure: true,
})
export class ConfirmPasswordValidationPipe implements PipeTransform {

  transform(form: AbstractControl, ...args: object[]): string {
    if (form.value !== args[0]) {
      return 'Passwords are not matching.';
    } else {
      return '';
    }
  }

}
