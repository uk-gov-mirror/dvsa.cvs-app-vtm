import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionsFieldsComponent } from './dimensions-fields.component';

describe('DimensionsFieldsComponent', () => {
  let component: DimensionsFieldsComponent;
  let fixture: ComponentFixture<DimensionsFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimensionsFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionsFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
