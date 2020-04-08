import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TyresFieldsComponent } from './tyres-fields.component';

describe('TyresFieldsComponent', () => {
  let component: TyresFieldsComponent;
  let fixture: ComponentFixture<TyresFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TyresFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TyresFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
