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
		return [
			this.tcs.hasChanged('techRecord_adrDetails_applicantDetails_city'),
			this.tcs.hasChanged('techRecord_adrDetails_applicantDetails_name'),
			this.tcs.hasChanged('techRecord_adrDetails_applicantDetails_postcode'),
			this.tcs.hasChanged('techRecord_adrDetails_applicantDetails_street'),
			this.tcs.hasChanged('techRecord_adrDetails_applicantDetails_town'),
		].some((hasChanged) => hasChanged);
	}

	hasInitialInspectionChanged() {
		return [
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tc2Details_tc2IntermediateApprovalNo'),
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tc2Details_tc2IntermediateExpiryDate'),
		].some((hasChanged) => hasChanged);
	}

	haveAnyADRDetailItemsChanged() {
		return [
			this.tcs.hasChanged('techRecord_adrDetails_vehicleDetails_type'),
			this.tcs.hasChanged('techRecord_adrDetails_vehicleDetails_usedOnInternationalJourneys'),
			this.tcs.hasChanged('techRecord_adrDetails_vehicleDetails_approvalDate'),
			this.tcs.hasChanged('techRecord_adrDetails_permittedDangerousGoods'),
			this.tcs.hasChanged('techRecord_adrDetails_bodyDeclaration_type'),
			this.tcs.hasChanged('techRecord_adrDetails_compatibilityGroupJ'),
			this.tcs.hasChanged('techRecord_adrDetails_additionalNotes_number'),
			this.tcs.hasChanged('techRecord_adrDetails_adrTypeApprovalNo'),
		].some((hasChanged) => hasChanged);
	}

	haveAnyTankDetailItemsChanged() {
		return [
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tankManufacturer'),
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_yearOfManufacture'),
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tankManufacturerSerialNo'),
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tankTypeAppNo'),
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tankCode'),
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tankStatement_substancesPermitted'),
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tankStatement_statement'),
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tankStatement_productListUnNo'),
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tankStatement_productListRefNo'),
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tankStatement_productList'),
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_specialProvisions'),
		].some((hasChanged) => hasChanged);
	}

	haveAnyTankInspectionItemsChanged() {
		return [
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tc2Details_tc2IntermediateApprovalNo'),
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tc2Details_tc2IntermediateExpiryDate'),
			this.tcs.hasChanged('techRecord_adrDetails_tank_tankDetails_tc3Details'),
		].some((hasChanged) => hasChanged);
	}

	haveAnyMiscellaneousItemsChanged() {
		return [
			this.tcs.hasChanged('techRecord_adrDetails_memosApply'),
			this.tcs.hasChanged('techRecord_adrDetails_m145Statement'),
		].some((hasChanged) => hasChanged);
	}

	haveAnyBatteryListItemsChanged() {
		return [
			this.tcs.hasChanged('techRecord_adrDetails_listStatementApplicable'),
			this.tcs.hasChanged('techRecord_adrDetails_batteryListNumber'),
		].some((hasChanged) => hasChanged);
	}

	haveAnyDeclarationsSeenItemsChanged() {
		return [
			this.tcs.hasChanged('techRecord_adrDetails_brakeDeclarationsSeen'),
			this.tcs.hasChanged('techRecord_adrDetails_brakeDeclarationIssuer'),
			this.tcs.hasChanged('techRecord_adrDetails_brakeEndurance'),
			this.tcs.hasChanged('techRecord_adrDetails_weight'),
			this.tcs.hasChanged('techRecord_adrDetails_declarationsSeen'),
		].some((hasChanged) => hasChanged);
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
