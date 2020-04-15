import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { PendingChangesGuard } from '@app/shared/pending-changes-guard/pending-changes.guard';
import { AdrDetailsFormModule } from '@app/technical-record/adr-details/adr-details-form/adr-details-form.module';
import { AdrDetailsSubmitEffects } from '@app/technical-record/store/adr-details-submit-effects';
import { TechnicalRecordComponent } from '@app/technical-record/technical-record.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faMedium, faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare as farCheckSquare, faSquare as farSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare, faCoffee, faMinus, faPlus, faSquare } from '@fortawesome/free-solid-svg-icons';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { NgrxFormsModule } from 'ngrx-forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { SharedModule } from '../shared/shared.module';
import { AdrDetailsViewComponent } from './adr-details/adr-details-view/adr-details-view.component';
import { AdrDetailsComponent } from './adr-details/adr-details.component';
import { BodyComponent } from './body/body.component';
import { DimensionsComponent } from './dimensions/dimensions.component';
import { NotesComponent } from './notes/notes.component';
import { AdrDetailsSubmitReducer } from './store/adrDetailsSubmit.reducer';
import { TechRecHistoryComponent } from './tech-rec-history/tech-rec-history.component';
import { TestHistoryComponent } from './test-history/test-history.component';
import { TyresComponent } from './tyres/tyres.component';
import { VehicleSummaryComponent } from './vehicle-summary/vehicle-summary.component';
import { WeightsComponent } from './weights/weights.component';
// import { BodyFieldsComponent } from './technical-record-fields/vehicle-summary/body-fields/body-fields.component';
import { WeightsFieldsComponent } from './technical-record-fields/weights-fields/weights-fields.component';
import { TyresFieldsComponent } from './technical-record-fields/tyres-fields/tyres-fields.component';
import { DimensionsFieldsComponent } from './technical-record-fields/dimensions-fields/dimensions-fields.component';
import { ApplicantDetailsComponent } from './technical-record-fields/applicant-details/applicant-details.component';
import { DocumentsFieldsComponent } from './technical-record-fields/documents-fields/documents-fields.component';
import { NotesFieldsComponent } from './technical-record-fields/notes-fields/notes-fields.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatFormFieldModule,
    RouterModule.forChild([
      { path: '', component: TechnicalRecordComponent, canActivate: [AuthenticationGuard], runGuardsAndResolvers: "always", canDeactivate: [PendingChangesGuard] }
    ]),
    StoreModule.forFeature('adrDetailsSubmit', AdrDetailsSubmitReducer),
    EffectsModule.forFeature([AdrDetailsSubmitEffects]),
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgrxFormsModule,
    NgxJsonViewerModule,
    AdrDetailsFormModule
  ],
  declarations: [
    TechnicalRecordComponent,
    VehicleSummaryComponent,
    BodyComponent,
    WeightsComponent,
    TyresComponent,
    DimensionsComponent,
    NotesComponent,
    TestHistoryComponent,
    TechRecHistoryComponent,
    AdrDetailsViewComponent,
    AdrDetailsComponent,
    // BodyFieldsComponent,
    WeightsFieldsComponent,
    TyresFieldsComponent,
    DimensionsFieldsComponent,
    ApplicantDetailsComponent,
    DocumentsFieldsComponent,
    NotesFieldsComponent
  ],
  exports: [
    TechnicalRecordComponent
  ]
})
export class TechnicalRecordModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faCoffee, faSquare, faCheckSquare, farSquare, farCheckSquare, faStackOverflow, faGithub, faMedium, faPlus, faMinus);
  }
}
