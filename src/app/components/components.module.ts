import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {TechnicalRecordComponent} from './technical-record/technical-record.component';

import {TechnicalRecordService} from './technical-record/technical-record.service';
import {HttpClientModule} from '@angular/common/http';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {FormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCheckSquare, faCoffee, faPlus, faMinus, faSquare} from '@fortawesome/free-solid-svg-icons';
import {faCheckSquare as farCheckSquare, faSquare as farSquare} from '@fortawesome/free-regular-svg-icons';
import {faGithub, faMedium, faStackOverflow} from '@fortawesome/free-brands-svg-icons';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TestResultService} from '../components/technical-record/test-result.service';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { TechnicalRecordSearchComponent } from './technical-record-search/technical-record-search.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {ComponentsRoutingModule} from './components-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    HttpClientModule,
    ComponentsRoutingModule,
    NgxJsonViewerModule,
    IonicModule.forRoot(),
    FormsModule,
    SharedModule,
    FontAwesomeModule
  ],
  declarations: [
    TechnicalRecordComponent, LandingPageComponent, TechnicalRecordSearchComponent, FooterComponent, HeaderComponent
  ],
  exports: [
    TechnicalRecordComponent, LandingPageComponent, TechnicalRecordSearchComponent, HeaderComponent, FooterComponent
  ],
  providers: [TechnicalRecordService, TestResultService],
  entryComponents: [],
})
export class ComponentsModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faCoffee, faSquare, faCheckSquare, farSquare, farCheckSquare, faStackOverflow, faGithub, faMedium, faPlus, faMinus);
  }
}
