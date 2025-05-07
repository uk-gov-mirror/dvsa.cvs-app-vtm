import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DefectsState, fetchDefects, fetchDefectsFailed, fetchDefectsSuccess, setDefectsLoading } from '@store/defects';
import { map, take } from 'rxjs';
import { CacheKeys, HttpService } from '../../services/http/http.service';

export const defectsTaxonomyResolver: ResolveFn<boolean> = () => {
	const http = inject(HttpService);
	const store: Store<DefectsState> = inject(Store<DefectsState>);
	const action$: Actions = inject(Actions);

	// TODO: find a better way to check cache
	if (http.bucket.has(CacheKeys.DEFECTS)) {
		store.dispatch(setDefectsLoading({ loading: false }));
		return true;
	}

	store.dispatch(fetchDefects());

	return action$.pipe(
		ofType(fetchDefectsSuccess, fetchDefectsFailed),
		take(1),
		map((action) => action.type === fetchDefectsSuccess.type)
	);
};
