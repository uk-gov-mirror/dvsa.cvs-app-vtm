import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from '@store/.';
import { fetchTestStations } from '@store/test-stations';

export const testStationsResolver: ResolveFn<boolean> = () => {
	const store: Store<State> = inject(Store<State>);
	const action$: Actions = inject(Actions);
	store.dispatch(fetchTestStations());
	return true;
	// return action$.pipe(
	// 	ofType(fetchTestStationsComplete),
	// 	take(1),
	// 	map((action) => action.type === fetchTestStationsComplete.type)
	// );
};
