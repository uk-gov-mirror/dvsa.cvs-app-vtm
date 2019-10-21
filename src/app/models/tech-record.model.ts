import {BrakeModel} from '@app/models/brake.model';
import {AxelsModel} from '@app/models/axels.model';
import {BodyTypeModel} from '@app/models/body-type.model';
import {VehicleClassModel} from '@app/models/vehicle-class.model';

export interface TechRecordModel {
  chassisMake: string;
  chassisModel: string;
  bodyMake: string;
  bodyModel: string;
  bodyType: BodyTypeModel;
  manufactureYear: number;
  regnDate: string;
  coifDate: string;
  ntaNumber: string;
  conversionRefNo: string;
  seatsLowerDeck: number;
  seatsUpperDeck: number;
  standingCapacity: number;
  speedRestriction: number;
  speedLimiterMrk: boolean;
  tachoExemptMrk: boolean;
  dispensations: string;
  remarks: string;
  reasonForCreation: string;
  statusCode: string;
  unladenWeight: number;
  grossKerbWeight: number;
  grossLadenWeight: number;
  grossGbWeight: number;
  grossDesignWeight: number;
  grossUnladenWeight: number;
  noOfAxles: number;
  brakeCode: string;
  vehicleClass: VehicleClassModel;
  vehicleType: string;
  vehicleSize: string;
  vehicleConfiguration: string;
  brakes: BrakeModel;
  axles: AxelsModel[];
}




