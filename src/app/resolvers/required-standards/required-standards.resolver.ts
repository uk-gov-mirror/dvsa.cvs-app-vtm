import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import {
	getRequiredStandards,
	getRequiredStandardsFailure,
	getRequiredStandardsSuccess,
	setRequiredStandardsLoading,
} from '@store/required-standards/required-standards.actions';
import { RequiredStandardState } from '@store/required-standards/required-standards.reducer';
import { testResultInEdit } from '@store/test-records/test-records.selectors';
import { map, take } from 'rxjs';
import { CacheKeys, HttpService } from '../../services/http/http.service';

export const requiredStandardsResolver: ResolveFn<boolean> = () => {
	const http = inject(HttpService);
	const store: Store<RequiredStandardState> = inject(Store<RequiredStandardState>);
	const action$: Actions = inject(Actions);

	if (http.bucket.has(CacheKeys.REQUIRED_STANDARDS)) {
		store.dispatch(setRequiredStandardsLoading({ loading: false }));
		return true;
	}

	store.pipe(select(testResultInEdit), take(1)).subscribe((editingTestResult) => {
		store.dispatch(getRequiredStandards({ euVehicleCategory: editingTestResult?.euVehicleCategory ?? '' }));
	});

	return action$.pipe(
		ofType(getRequiredStandardsSuccess, getRequiredStandardsFailure),
		take(1),
		map((action) => action.type === getRequiredStandardsSuccess.type)
	);
};
