import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '@app/material.module';
import { TestDeleteReasonModalComponent } from './test-delete-reason-modal.component';

describe('TestDeleteReasonModalComponent', () => {
  let component: TestDeleteReasonModalComponent;
  let fixture: ComponentFixture<TestDeleteReasonModalComponent>;
  const dialogMock = { close: () => {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestDeleteReasonModalComponent],
      imports: [MatDialogModule, MaterialModule, FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDeleteReasonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('close', () => {
    beforeEach(() => {
      spyOn(component.dialogRef, 'close');
    });
    it('should close the modal when the close button is clicked', () => {
      component.close();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });

    it('should close the modal with entered data when save button is clicked', () => {
      const data = 'some entered data';
      component.save(data);
      expect(component.dialogRef.close).toHaveBeenCalledWith(data);
    });
  });
});
