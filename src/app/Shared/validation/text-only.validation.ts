import { AbstractControl, ValidatorFn } from '@angular/forms';

export function textonlyValidation(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value) {
      return null;
    }
    const regec = new RegExp('^[a-zA-Z]+$');
    const isValid = regec.test(control.value);

    return isValid ? null : { textonlyValidation: true };
  };
}