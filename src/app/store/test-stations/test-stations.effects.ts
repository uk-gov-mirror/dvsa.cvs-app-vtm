import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpService } from '@services/http/http.service';
import { catchError, finalize, map, mergeMap, of, switchMap } from 'rxjs';
import {
	fetchTestStation,
	fetchTestStationFailed,
	fetchTestStationSuccess,
	fetchTestStations,
	fetchTestStationsFailed,
	fetchTestStationsSuccess,
	setTestStationsLoading,
} from './test-stations.actions';

@Injectable()
export class TestStationsEffects {
	private store = inject(Store);
	private actions$ = inject(Actions);
	private httpService = inject(HttpService);

	fetchTestStations$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchTestStations),
			switchMap(() =>
				this.httpService.fetchTestStations().pipe(
					map((testStations) => fetchTestStationsSuccess({ payload: testStations })),
					catchError((e) => of(fetchTestStationsFailed({ error: e.message }))),
					finalize(() => this.store.dispatch(setTestStationsLoading({ loading: false })))
				)
			)
		)
	);

	fetchTestStation$ = createEffect(() =>
		this.actions$.pipe(
			ofType(fetchTestStation),
			mergeMap(({ id }) =>
				this.httpService.fetchTestStation(id).pipe(
					map((testStation) => fetchTestStationSuccess({ id, payload: testStation })),
					catchError((e) => of(fetchTestStationFailed({ error: e.message })))
				)
			)
		)
	);
}
