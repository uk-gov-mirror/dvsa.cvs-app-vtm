import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'digitGroupSeparator',
	pure: true,
})
export class DigitGroupSeparatorPipe implements PipeTransform {
	transform(value: number | undefined): string | undefined {
		if (value) {
			return value.toLocaleString();
		}
		return undefined;
	}
}
