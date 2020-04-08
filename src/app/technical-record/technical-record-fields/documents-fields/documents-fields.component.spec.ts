import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsFieldsComponent } from './documents-fields.component';

describe('DocumentsFieldsComponent', () => {
  let component: DocumentsFieldsComponent;
  let fixture: ComponentFixture<DocumentsFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
