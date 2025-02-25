// biome-ignore lint/style/useNodejsImportProtocol: Jasmine error when importing from node protocol
import { createHash } from 'crypto';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { UserService } from '@services/user-service/user-service';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AnalyticsService implements OnDestroy {
	private userService = inject(UserService);
	destroy$ = new Subject<void>();

	pushToDataLayer(data: any): void {
		// @ts-ignore
		window.dataLayer.push(data);
	}

	setUserId(userId: string): void {
		const uniqueId = this.createUniqueId(userId);
	}

	createUniqueId(userId: string): string {
		if (!environment.production) {
			let userEmail = '';
			this.userService.userEmail$.pipe(takeUntil(this.destroy$)).subscribe((email) => {
				userEmail = email;
			});
			return createHash('sha256').update(userEmail).digest('hex');
		}

		if (environment.production && userId) {
			return createHash('sha256').update(userId).digest('hex');
		}

		return 'N/A';
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
