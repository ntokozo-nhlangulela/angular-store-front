import { FormControl } from '@angular/forms';
import { textonlyValidation } from './text-only.validation';

describe('textonlyValidation', () => {
  it('should return null for valid input', () => {
    const validator = textonlyValidation();
    const control = new FormControl('ValidText');

    const result = validator(control);

    expect(result).toBeNull();
  });

  it('should return validation error for invalid input', () => {
    const validator = textonlyValidation();
    const control = new FormControl('123InvalidText');

    const result = validator(control);

    expect(result).toEqual({ textonlyValidation: true });
  });

  it('should return null for empty input', () => {
    const validator = textonlyValidation();
    const control = new FormControl('');

    const result = validator(control);

    expect(result).toBeNull();
  });
});
