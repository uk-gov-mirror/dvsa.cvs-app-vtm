import { TestRecordComponent } from '@/src/app/features/test-records/amend/views/test-record-wrapper/test-record/test-record.component';
import { Injectable, inject } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { cancelEditingTestResult } from '@store/test-records';

@Injectable({
	providedIn: 'root',
})
export class CancelEditTestGuard implements CanDeactivate<TestRecordComponent> {
	store = inject(Store);

	canDeactivate(): boolean {
		this.store.dispatch(cancelEditingTestResult());
		return true;
	}
}
