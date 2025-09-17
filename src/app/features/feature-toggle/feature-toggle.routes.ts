import { MsalGuard } from '@azure/msal-angular';
import { FeatureToggleGuard } from '@guards/feature-toggle-guard/feature-toggle.guard';

export const routes = [
	{
		path: '',
		loadComponent: () => import('./feature-toggle/feature-toggle.component').then((m) => m.FeatureToggleComponent),
		data: { title: 'Feature Toggle', featureToggleName: 'testtoggle' },
		canActivate: [MsalGuard, FeatureToggleGuard],
	},
];
