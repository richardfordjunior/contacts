import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

interface IContact {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-contact-list-add',
  templateUrl: './contact-list-add.component.html',
  styleUrls: ['./contact-list-add.component.css']
})
export class ContactListAddComponent implements OnInit {

  contactModel: IContact;
  contactForm: FormGroup;
  submitSuccess = false;

  constructor(
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    });
  }

  onSubmit(form: FormGroup) {
    this.contactModel = form.value as IContact;
    this.submitSuccess = true;
    console.log(this.contactModel);
  }

  isValidEmail(email: string): RegExpMatchArray {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!email && typeof email === 'string'
      && email.match(emailRegex);
  }
}
