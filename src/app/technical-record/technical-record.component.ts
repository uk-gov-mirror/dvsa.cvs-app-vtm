import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  OnDestroy
} from '@angular/core';
import { initAll } from 'govuk-frontend';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { selectSelectedVehicleTestResultModel } from '@app/store/selectors/VehicleTestResultModel.selectors';
import { IAppState } from './adr-details-form/store/adrDetailsForm.state';
import { selectVehicleTechRecordModelHavingStatusAll } from '@app/store/selectors/VehicleTechRecordModel.selectors';
import { AdrReasonModalComponent } from '@app/shared/adr-reason-modal/adr-reason-modal.component';
import { Router, NavigationEnd } from '@angular/router';
import { SubmitAdrAction } from './store/adrDetailsSubmit.actions';
import {TechRecordHelpersService} from '@app/technical-record/tech-record-helpers.service';

@Component({
  selector: 'vtm-technical-record',
  templateUrl: './technical-record.component.html',
  styleUrls: ['../app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnicalRecordComponent implements OnInit , OnDestroy {

  techRecordsJson$: Observable<any>;
  testResultJson$: Observable<any>;

  @HostBinding('@.disabled')
  public animationsDisabled = true;

  searchIdentifier = '{none searched}';
  panels: { panel: string, isOpened: boolean }[] = [{ panel: 'panel1', isOpened: false }, { panel: 'panel2', isOpened: false },
    { panel: 'panel3', isOpened: false }, { panel: 'panel4', isOpened: false },
    { panel: 'panel5', isOpened: false }, { panel: 'panel6', isOpened: false }, { panel: 'panel7', isOpened: false },
    { panel: 'panel8', isOpened: false }, { panel: 'panel9', isOpened: false }, { panel: 'panel10', isOpened: false }];
  allOpened = false;
  color = 'red';
  changeLabel = 'Change technical record';
  isSubmit = false;
  adrData = true;
  hideForm = false;
  showCheck = false;
  numberFee: any;
  isAdrNull: any;
  navigationSubscription;

  constructor(private _store: Store<IAppState>, public dialog: MatDialog, private router: Router, public techRecHelpers: TechRecordHelpersService) {
    this.initializeTechnicalRecord();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initializeTechnicalRecord();
      }
    });
  }

  initializeTechnicalRecord() {
    this.cancelAddrEdit();
    this.techRecordsJson$ = this._store.select(selectVehicleTechRecordModelHavingStatusAll);
    this.testResultJson$ = this._store.pipe(select(selectSelectedVehicleTestResultModel));
  }

  ngOnInit() {
    initAll();
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
   }
  }

  public togglePanel() {
    for (const panel of this.panels) {
      panel.isOpened = !this.allOpened;
    }
    this.allOpened = !this.allOpened;
  }

  public hasSecondaryVrms(vrms) {
    return (vrms.length > 1) && (vrms.filter(vrm => vrm.isPrimary === false).length > 0);
  }

  public adrEdit(techRecordsJson, numberFee, dangerousGoods, isAdrNull) {
    this.changeLabel = 'Save technical record';
    this.isSubmit = true;
    this.adrData = false;
    this.showCheck = true;
    this.numberFee = numberFee;
    this.isAdrNull = isAdrNull == null;
    this.hideForm = this.isAdrNull;
  }

  public cancelAddrEdit() {
    this.changeLabel = 'Change technical record';
    this.adrData = true;
    this.showCheck = false;
    this.isSubmit = false;
    this.hideForm = false;
  }

  onSaveChanges() {
    let reasonForChanges = '';
    const dialogRef = this.dialog.open(AdrReasonModalComponent, {
      width: '600px',
      data: {context: 'Enter reason for changing technical record', response: reasonForChanges }
    });

    dialogRef.afterClosed().subscribe(result => {
      reasonForChanges = result;
      console.log(`The dialog was closed with response ${reasonForChanges}`);
      this._store.dispatch(new SubmitAdrAction(reasonForChanges));
    });
  }

}
