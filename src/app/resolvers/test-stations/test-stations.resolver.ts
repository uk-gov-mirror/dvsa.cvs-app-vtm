import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from '@store/.';
import {
	fetchTestStations,
	fetchTestStationsFailed,
	fetchTestStationsSuccess,
	setTestStationsLoading,
} from '@store/test-stations';
import { map, take } from 'rxjs';
import { CacheKeys, HttpService } from '../../services/http/http.service';

export const testStationsResolver: ResolveFn<boolean> = () => {
	const http = inject(HttpService);
	const store: Store<State> = inject(Store<State>);
	const action$: Actions = inject(Actions);

	if (http.bucket.has(CacheKeys.TEST_STATIONS)) {
		store.dispatch(setTestStationsLoading({ loading: false }));
		return true;
	}

	store.dispatch(fetchTestStations());

	return action$.pipe(
		ofType(fetchTestStationsSuccess, fetchTestStationsFailed),
		take(1),
		map((action) => action.type === fetchTestStationsSuccess.type)
	);
};
