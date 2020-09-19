import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

interface Icontacts {
  _id: string;
  index: number;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  contacts$: Observable<Omit<Icontacts, '_id, index'>>;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'company',
    'email',
    'phone',
    'address'
  ];

  constructor(
    private appService: AppService,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchContacts();
  }

  goToAddContactForm() {
    this.router.navigate(['/contact/add']);
  }

  fetchContacts() {
    this.contacts$ = this.appService.getContacts();
  }
}
