import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyFieldsComponent } from './body-fields.component';

describe('BodyFieldsComponent', () => {
  let component: BodyFieldsComponent;
  let fixture: ComponentFixture<BodyFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
