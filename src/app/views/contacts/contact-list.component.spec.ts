import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ContactListComponent } from './contact-list.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let mockRouter: { navigate: any; };
  beforeEach(async(() => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      declarations: [ContactListComponent], imports: [
        HttpClientModule,
        HttpClientModule,
        RouterModule,
        RouterTestingModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        HttpClient,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render grid columns', (done) => {
    expect(component.displayedColumns.length).toEqual(6);
    done();
  });

  it('should call fetchContacts on startup', (done) => {
    spyOn(component, 'fetchContacts');
    component.fetchContacts();
    expect(component.fetchContacts).toBeDefined();
    expect(component.fetchContacts).toHaveBeenCalled();
    done();
  });

  it('should navigate to Add Contacts page', (done) => {
    fixture.detectChanges();
    component.goToAddContactForm();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/contact/add']);
    done();
  });

  it('should have contacts information from api call', (done) => {
    spyOn(component, 'fetchContacts');
    component.fetchContacts();
    expect(component.contacts$).toBeInstanceOf(Observable);
    const sub = component.contacts$.pipe(
      map((contacts: any) => contacts)
    ).subscribe(res => {
      for (const key in res) {
        if (res[key]['index'] === 1) {
          expect(res[key]['firstName']).toEqual('Mcmahon');
          expect(res[key]['lastName']).toEqual('Fulton');
          expect(res[key]['email']).toEqual('mcmahonfulton@illumity.com');
        }
      }
      sub.unsubscribe();
    }, (err) => {
      sub.unsubscribe();
      throw new Error(err);
    });
    done();
  });
});
