import { Injectable, inject } from '@angular/core';
import { get } from 'lodash';
import { take } from 'rxjs';
import { HttpService } from '../http/http.service';

export interface FeatureConfig {
	[key: string]: { enabled: boolean };
}

@Injectable({
	providedIn: 'root',
})
export class FeatureToggleService {
	config: FeatureConfig | null = null;
	httpService = inject(HttpService);

	async loadConfig() {
		this.httpService
			.getFeatureFlags()
			.pipe(take(1))
			.subscribe((config) => {
				this.config = config;
			});
	}

	isFeatureEnabled(key: string) {
		if (!this.config) return false;
		const feature = get(this.config, key);
		if (!feature) return false;

		return feature.enabled;
	}
}
