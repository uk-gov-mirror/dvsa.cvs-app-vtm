import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AxleBrakesComponent } from './axle-brakes.component';
import { SharedModule } from '@app/shared/shared.module';
import { TESTING_UTILS } from '@app/utils/testing.utils';

describe('AxleBrakesComponent', () => {
  let component: AxleBrakesComponent;
  let fixture: ComponentFixture<AxleBrakesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [AxleBrakesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxleBrakesComponent);
    component = fixture.componentInstance;
  });

  it('should create view only with populated data', () => {
    component.axle = TESTING_UTILS.mockAxle();

    fixture.detectChanges();
    expect(component).toBeDefined();
    expect(fixture).toMatchSnapshot();
  });
});
