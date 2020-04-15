import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTestTypeComponent } from './select-test-type.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { KeyValue } from '@angular/common';
import { TestTypeCategory } from '@app/models/test-type-category';
import { TEST_MODEL_UTILS } from '@app/utils';

describe('SelectTestTypeComponent', () => {
  let component: SelectTestTypeComponent;
  let fixture: ComponentFixture<SelectTestTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectTestTypeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ id: 'W01A34247' }),
            paramMap: of(convertToParamMap({ id: 'W01A34247' }))
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTestTypeComponent);
    component = fixture.componentInstance;
    component.filteredCategories = [TEST_MODEL_UTILS.mockTestTypeCategory()];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit on change test type CTA', () => {
    const testTreeNode = {
      key: '1',
      value: 'test'
    } as KeyValue<string, string>;

    component.newTestTypeData = testTreeNode;
    fixture.detectChanges();

    spyOn(component.selectTypeHandler, 'emit');
    component.updateSelectedTestResult();
    expect(component.selectTypeHandler.emit).toHaveBeenCalledWith(testTreeNode);
  });
});

@Component({
  selector: 'vtm-tree-component',
  template: `
    <div>{{ treeData | json }}</div>
  `
})
class TestTreeComponent {
  @Input() treeData: TestTypeCategory[];
}
