import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
	providedIn: 'root',
})
export class EncryptionService {
	hash(value: string): string {
		return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
	}
}
