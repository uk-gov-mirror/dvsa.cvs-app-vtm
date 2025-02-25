import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AnalyticsService {
	pushToDataLayer(data: any): void {
		// @ts-ignore
		window.dataLayer.push(data);
	}
}
