import { Component, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrefixDirective } from '../prefix.directive';

@Component({
	template: '<ng-template appPrefix></ng-template>',
})
class TestComponent {}

describe('PrefixDirective', () => {
	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestComponent],
			declarations: [PrefixDirective],
			providers: [TemplateRef],
		}).compileComponents();

		fixture = TestBed.createComponent(TestComponent);
		fixture.detectChanges();

		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
