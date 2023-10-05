import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Pipe({
  name: 'isFieldInvalid',
  pure: true,
})
export class IsFieldInvalidPipe implements PipeTransform {
  transform(field: AbstractControl, ...args: object[]): boolean {
    if (field == null) {
      return true;
    }
    return (field.dirty || field.touched) && field.invalid;
  }
}
