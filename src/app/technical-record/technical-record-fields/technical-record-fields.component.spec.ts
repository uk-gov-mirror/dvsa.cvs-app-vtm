import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalRecordFieldsComponent } from './technical-record-fields.component';

describe('TechnicalRecordFieldsComponent', () => {
  let component: TechnicalRecordFieldsComponent;
  let fixture: ComponentFixture<TechnicalRecordFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalRecordFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalRecordFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
