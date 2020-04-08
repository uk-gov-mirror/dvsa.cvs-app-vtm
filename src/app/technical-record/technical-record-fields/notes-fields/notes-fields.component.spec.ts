import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesFieldsComponent } from './notes-fields.component';

describe('NotesFieldsComponent', () => {
  let component: NotesFieldsComponent;
  let fixture: ComponentFixture<NotesFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
