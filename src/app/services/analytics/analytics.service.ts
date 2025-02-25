import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { UserService } from '@services/user-service/user-service';
import { Subject, firstValueFrom } from 'rxjs';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable({
	providedIn: 'root',
})
export class AnalyticsService {
	private userService = inject(UserService);
	private encryptionService = inject(EncryptionService);

	destroy$ = new Subject<void>();

	pushToDataLayer(data: any): void {
		// @ts-ignore
		window.dataLayer.push(data);
	}

	async setUserId(): Promise<void> {
		const uniqueId = await this.createUniqueId();
		this.pushToDataLayer({ UserIDDataLayer: uniqueId });
	}

	async createUniqueId(): Promise<string> {
		if (!environment.production) {
			const userEmail = await firstValueFrom(this.userService.userEmail$);
			return this.encryptionService.hash(userEmail);
		}
		const userId = await firstValueFrom(this.userService.id$);
		if (environment.production && userId) {
			return this.encryptionService.hash(userId);
		}

		return 'N/A';
	}
}
