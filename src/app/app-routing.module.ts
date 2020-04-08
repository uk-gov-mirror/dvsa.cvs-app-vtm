import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { LandingPageComponent } from '@app/landing-page/landing-page.component';
import { TechnicalRecordCreateComponent } from '@app/technical-record-create/technical-record-create.component';
import { TestRecordComponent } from '@app/test-record/test-record.component';
import { TechnicalRecordFieldsComponent } from './technical-record/technical-record-fields/technical-record-fields.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [AuthenticationGuard] },
  {
    path: 'search',
    loadChildren: './technical-record-search/technical-record-search.module#TechnicalRecordSearchModule',
    canActivate: [AuthenticationGuard]
  },
  { path: 'create', component: TechnicalRecordCreateComponent, canActivate: [AuthenticationGuard] },
  {
    path: 'technical-record',
    loadChildren: './technical-record/technical-record.module#TechnicalRecordModule',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'technical-record-create', component: TechnicalRecordFieldsComponent, canActivate: [AuthenticationGuard]
  },
  { path: 'test-record/:id', component: TestRecordComponent, canActivate: [AuthenticationGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
