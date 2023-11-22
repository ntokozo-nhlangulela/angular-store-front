import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { textonlyValidation } from 'src/app/Shared/validation/text-only.validation';
import { NavBarComponent } from '../../Nav-bar/nav-bar/nav-bar.component';
import { ContactUs } from '../model/contact-us';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavBarComponent],
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  contactUs: ContactUs;
  constructor(private fb: FormBuilder) {}

  get name(): AbstractControl {
    return this.contactForm.get('name')!;
  }
  get email(): AbstractControl {
    return this.contactForm.get('email')!;
  }
  get phone(): AbstractControl {
    return this.contactForm.get('phone')!;
  }

  get description(): AbstractControl | null {
    return this.contactForm.get('description');
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, textonlyValidation()]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern('[0-9]{10}')],
      description: ['', Validators.required],
    });
    this.name.valueChanges.subscribe((x) => (this.contactUs.name = x));
    this.email.valueChanges.subscribe((x) => (this.contactUs.email = x));
    this.description?.valueChanges // Use optional chaining operator
      .subscribe((x) => (this.contactUs.description = x));
    this.phone.valueChanges.subscribe((x) => (this.contactUs.phone = x));
  }

  submitForm() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      alert('Success');
    } else {
      this.markFormGroupTouched(this.contactForm);
      alert('Error');
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
