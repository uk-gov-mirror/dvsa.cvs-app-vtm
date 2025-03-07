import { Pipe, PipeTransform } from '@angular/core';
import { VehicleTypes } from '@models/vehicle-tech-record.model';

@Pipe({
	name: 'formatVehicleType',
	standalone: false,
})
export class FormatVehicleTypePipe implements PipeTransform {
	transform(value: VehicleTypes | undefined | null): unknown {
		switch (value) {
			case VehicleTypes.TRL:
				return 'trailer';
			default:
				return value?.toUpperCase();
		}
	}
}
