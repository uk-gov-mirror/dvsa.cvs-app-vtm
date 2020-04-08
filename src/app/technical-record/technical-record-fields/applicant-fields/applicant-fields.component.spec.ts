import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantFieldsComponent } from './applicant-fields.component';

describe('ApplicantFieldsComponent', () => {
  let component: ApplicantFieldsComponent;
  let fixture: ComponentFixture<ApplicantFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
