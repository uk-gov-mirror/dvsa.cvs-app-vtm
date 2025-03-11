import { TechnicalRecordChangesService } from '@/src/app/services/technical-record/technical-record-changes.service';
import { Component, Signal, inject } from '@angular/core';
import { TechRecordType } from '@dvsa/cvs-type-definitions/types/v3/tech-record/tech-record-vehicle-type';
import { Store } from '@ngrx/store';
import { AdrService } from '@services/adr/adr.service';
import { editingTechRecord, techRecord } from '@store/technical-records';
import { isEqual } from 'lodash';

type ADRTechRecord = TechRecordType<'hgv' | 'trl' | 'lgv'> & {
	techRecord_adrDetails_additionalExaminerNotes_note: string;
};

@Component({
	selector: 'app-adr-section-summary',
	templateUrl: './adr-section-summary.component.html',
	styleUrls: ['./adr-section-summary.component.scss'],
})
export class AdrSectionSummaryComponent {
	store = inject(Store);
	adrService = inject(AdrService);
	tcs = inject(TechnicalRecordChangesService);

	currentTechRecord = this.store.selectSignal(techRecord) as Signal<ADRTechRecord>;
	amendedTechRecord = this.store.selectSignal(editingTechRecord) as Signal<ADRTechRecord>;

	haveAnyApplicantDetailItemsChanged() {
		return this.tcs.hasChanged(
			'techRecord_adrDetails_applicantDetails_city',
			'techRecord_adrDetails_applicantDetails_name',
			'techRecord_adrDetails_applicantDetails_postcode',
			'techRecord_adrDetails_applicantDetails_street',
			'techRecord_adrDetails_applicantDetails_town'
		);
	}

	hasInitialInspectionChanged() {
		return this.tcs.hasChanged(
			'techRecord_adrDetails_tank_tankDetails_tc2Details_tc2IntermediateApprovalNo',
			'techRecord_adrDetails_tank_tankDetails_tc2Details_tc2IntermediateExpiryDate'
		);
	}

	haveAnyADRDetailItemsChanged() {
		return this.tcs.hasChanged(
			'techRecord_adrDetails_vehicleDetails_type',
			'techRecord_adrDetails_vehicleDetails_usedOnInternationalJourneys',
			'techRecord_adrDetails_vehicleDetails_approvalDate',
			'techRecord_adrDetails_permittedDangerousGoods',
			'techRecord_adrDetails_bodyDeclaration_type',
			'techRecord_adrDetails_compatibilityGroupJ',
			'techRecord_adrDetails_additionalNotes_number',
			'techRecord_adrDetails_adrTypeApprovalNo'
		);
	}

	haveAnyTankDetailItemsChanged() {
		return this.tcs.hasChanged(
			'techRecord_adrDetails_tank_tankDetails_tankManufacturer',
			'techRecord_adrDetails_tank_tankDetails_yearOfManufacture',
			'techRecord_adrDetails_tank_tankDetails_tankManufacturerSerialNo',
			'techRecord_adrDetails_tank_tankDetails_tankTypeAppNo',
			'techRecord_adrDetails_tank_tankDetails_tankCode',
			'techRecord_adrDetails_tank_tankDetails_tankStatement_substancesPermitted',
			'techRecord_adrDetails_tank_tankDetails_tankStatement_statement',
			'techRecord_adrDetails_tank_tankDetails_tankStatement_productListUnNo',
			'techRecord_adrDetails_tank_tankDetails_tankStatement_productListRefNo',
			'techRecord_adrDetails_tank_tankDetails_tankStatement_productList',
			'techRecord_adrDetails_tank_tankDetails_specialProvisions'
		);
	}

	haveAnyTankInspectionItemsChanged() {
		return this.tcs.hasChanged(
			'techRecord_adrDetails_tank_tankDetails_tc2Details_tc2IntermediateApprovalNo',
			'techRecord_adrDetails_tank_tankDetails_tc2Details_tc2IntermediateExpiryDate',
			'techRecord_adrDetails_tank_tankDetails_tc3Details'
		);
	}

	haveAnyMiscellaneousItemsChanged() {
		return this.tcs.hasChanged('techRecord_adrDetails_memosApply', 'techRecord_adrDetails_m145Statement');
	}

	haveAnyBatteryListItemsChanged() {
		return this.tcs.hasChanged(
			'techRecord_adrDetails_listStatementApplicable',
			'techRecord_adrDetails_batteryListNumber'
		);
	}

	haveAnyDeclarationsSeenItemsChanged() {
		return this.tcs.hasChanged(
			'techRecord_adrDetails_brakeDeclarationsSeen',
			'techRecord_adrDetails_brakeDeclarationIssuer',
			'techRecord_adrDetails_brakeEndurance',
			'techRecord_adrDetails_weight',
			'techRecord_adrDetails_declarationsSeen'
		);
	}

	hasUNNumberChanged(index: number) {
		const current = this.currentTechRecord() as ADRTechRecord;
		const amended = this.amendedTechRecord() as ADRTechRecord;
		if (!current || !amended) return true;

		return !isEqual(
			current.techRecord_adrDetails_tank_tankDetails_tankStatement_productListUnNo?.[index],
			amended.techRecord_adrDetails_tank_tankDetails_tankStatement_productListUnNo?.[index]
		);
	}
}
