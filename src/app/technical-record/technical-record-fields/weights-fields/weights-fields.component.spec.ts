import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightsFieldsComponent } from './weights-fields.component';

describe('WeightsFieldsComponent', () => {
  let component: WeightsFieldsComponent;
  let fixture: ComponentFixture<WeightsFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightsFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightsFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
