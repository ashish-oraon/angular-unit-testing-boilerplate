import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  ValidatorFn,
} from '@angular/forms';

function lengthMatcher(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): null | { [key: string]: boolean } => {
    const controlValue = c.value;
    console.log(typeof controlValue);
    if (typeof controlValue === 'string') {
      if (controlValue.length >= min && controlValue.length <= max) {
        return null;
      } else {
        return { lengthMatch: true };
      }
    } else {
      return { notString: true };
    }
    return null;
  };
}

function emailMatcher(c: AbstractControl): null | { [key: string]: boolean } {
  const firstControl = c.get('email');
  const secondControl = c.get('confirmEmail');

  if (firstControl?.pristine || secondControl?.pristine) {
    return null;
  }
  if (firstControl?.value === secondControl?.value) {
    return null;
  }
  return { match: true };
}

export class Customer {
  constructor(public firstName = '', public lastName = '', public email = '') {}
}
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customer = new Customer();
  constructor(private fb: FormBuilder) {}
  customerForm!: FormGroup;
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [lengthMatcher(3, 10)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      emailGroup: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', [Validators.required]],
        },
        { validator: emailMatcher }
      ),
    });
  }
  save(customerForm?: NgForm) {
    console.log(this.customerForm.value);
    console.log(`Saved: ${JSON.stringify(this.customerForm.value)}`);
  }
}
