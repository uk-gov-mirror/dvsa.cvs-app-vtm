import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from '@store/.';
import {
	fetchTestTypes,
	fetchTestTypesFailed,
	fetchTestTypesSuccess,
	setTestTypesLoading,
} from '@store/test-types/test-types.actions';
import { map, take } from 'rxjs';
import { CacheKeys, HttpService } from '../../services/http/http.service';

export const testTypeTaxonomyResolver: ResolveFn<boolean> = () => {
	const http = inject(HttpService);
	const store: Store<State> = inject(Store<State>);
	const action$: Actions = inject(Actions);

	if (http.bucket.has(CacheKeys.TEST_TYPES)) {
		store.dispatch(setTestTypesLoading({ loading: false }));
		return true;
	}

	store.dispatch(fetchTestTypes());

	return action$.pipe(
		ofType(fetchTestTypesSuccess, fetchTestTypesFailed),
		take(1),
		map((action) => action.type === fetchTestTypesSuccess.type)
	);
};
