import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AccordionComponent } from '@app/shared/libraries/accordion/accordion.component';
import { AccordionItemComponent } from '@app/shared/libraries/accordion-item/accordion-item.component';

export const PIPES_AND_COMPONENTS = [
  AccordionComponent,
  AccordionItemComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: PIPES_AND_COMPONENTS,
  exports: PIPES_AND_COMPONENTS,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibrariesModule {}
