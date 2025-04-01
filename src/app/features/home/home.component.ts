import { Component } from '@angular/core';
import { Roles } from '@models/roles.enum';
import { RoleRequiredDirective } from '../../directives/app-role-required/app-role-required.directive';
import { HomeButtonComponent } from './components/home-button/home-button.component';
import { FeatureToggleDirective } from '../../directives/feature-toggle/feature-toggle.directive';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [
        RoleRequiredDirective,
        HomeButtonComponent,
        FeatureToggleDirective,
    ],
})
export class HomeComponent {
	public get Roles() {
		return Roles;
	}
}
