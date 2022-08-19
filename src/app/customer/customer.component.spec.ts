import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomerComponent } from './customer.component';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check input boxes', () => {
    // const firstNameInput = fixture.debugElement.query(
    //   By.css('[data-test-id = "firstName"]')
    // );
    // const firstNameInput = getInputControlById(fixture, 'firstName');
    const inputControls = [];
    inputControls.push(getInputControlById(fixture, 'firstName'));
    inputControls.push(getInputControlById(fixture, 'lastName'));
    inputControls.push(getInputControlById(fixture, 'email'));
    inputControls.forEach((control) => expect(control).toBeTruthy());
    // expect(firstNameInput).toBeTruthy();
    // expect(firstNameInput.nativeElement).toBeTruthy();
  });
});

function getInputControlById(
  fixture: ComponentFixture<CustomerComponent>,
  id: string
) {
  return fixture.debugElement.query(By.css(`[data-test-id = "${id}"]`));
}
// updateFormControl(componentInstance, formName, id, value){
//   fix
// }
