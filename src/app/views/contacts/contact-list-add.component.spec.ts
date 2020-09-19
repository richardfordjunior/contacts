import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactListAddComponent } from './contact-list-add.component';
import { AbstractControlDirective, FormBuilder } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { doesNotReject } from 'assert';



describe('ContactListAddComponent', () => {
  let component: ContactListAddComponent;
  let fixture: ComponentFixture<ContactListAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactListAddComponent],
      imports: [
      ],
      providers: [
        FormBuilder
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the submit button and be disabled on startup', (done) => {
    const submitEL: DebugElement = fixture.debugElement.query(By.css('#btnAddContact'));
    expect(submitEL.nativeElement.disabled).toBe(true);
    expect(submitEL).toBeTruthy();
    done();
  });

  it('should render input elements', (done) => {
    const firstName: DebugElement = fixture.debugElement.query(By.css('#firstName'));
    const lastName: DebugElement = fixture.debugElement.query(By.css('#lastName'));
    const address: DebugElement = fixture.debugElement.query(By.css('#address'));
    const email: DebugElement = fixture.debugElement.query(By.css('#email'));
    const phone: DebugElement = fixture.debugElement.query(By.css('#phone'));
    const company: DebugElement = fixture.debugElement.query(By.css('#company'));

    expect(firstName).toBeTruthy();
    expect(lastName).toBeTruthy();
    expect(address).toBeTruthy();
    expect(email).toBeTruthy();
    expect(phone).toBeTruthy();
    expect(company).toBeTruthy();
    done();
  });

  it('should test form validity', (done) => {
    const form = component.contactForm;
    expect(form.valid).toBeFalsy();
    done();
  });

  it('should test input validity', (done) => {
    const nameInput = component.contactForm.controls.firstName;
    expect(nameInput.valid).toBeFalsy();
    nameInput.setValue('John');
    expect(nameInput.valid).toBeTruthy();
    done();
  });

  it('should disable Add Contact button if email address is not valid', (done) => {
    const emailInput = component.contactForm.controls.email;
    const submitEL: DebugElement = fixture.debugElement.query(By.css('#btnAddContact'));
    emailInput.setValue('JohnATmyemail.com');
    expect(emailInput.valid).toBeFalsy();
    expect(submitEL.nativeElement.disabled).toBe(true);
    done();
  });

  it('should validate email address element if email address is valid', (done) => {
    const emailInput = component.contactForm.controls.email;
    emailInput.setValue('John@myemail.com');
    expect(emailInput.valid).toBeTruthy();
    done();
  });

  it('should call email validation function', (done) => {
    const emailInput = component.contactForm.controls.email;
    const emailParam = 'John@myemail.com';
    emailInput.setValue(emailParam);
    spyOn(component, 'isValidEmail');
    component.isValidEmail(emailParam);
    expect(component.isValidEmail).toHaveBeenCalledTimes(1);
    done();
  });

  it('should test input errors', (done) => {
    const firstNameInput = component.contactForm.controls.firstName;
    const submitEL: DebugElement = fixture.debugElement.query(By.css('#btnAddContact'));
    expect(firstNameInput.errors.required).toBeTruthy();
    firstNameInput.setValue('John');
    expect(firstNameInput.errors).toBeNull();
    expect(submitEL.nativeElement.disabled).toBe(true);
    done();
  });

  it('should make the form valid when all inputs are satisfied', (done) => {
    const testControls = component.contactForm.controls;

    for (const key in testControls) {
      if (testControls.hasOwnProperty(key)) {
        switch (key) {
          case 'firstName':
            testControls[key].setValue('Tester');
            break;
          case 'lastName':
            testControls[key].setValue('Jester');
            break;
          case 'phone':
            testControls[key].setValue('+1 (516)-555-1234');
            break;
          case 'address':
            testControls[key].setValue('123 Main St, city, NY 19992');
            break;
          case 'company':
            testControls[key].setValue('myComany');
            break;
          case 'email':
            testControls[key].setValue('test@email.com');
            break;
        }
      }
    }
    expect(component.contactForm.status).toEqual('VALID');
    done();
  });
});
