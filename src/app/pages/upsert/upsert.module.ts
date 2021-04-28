import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpsertPageRoutingModule } from './upsert-routing.module';

import { UpsertPage } from './upsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpsertPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [UpsertPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class UpsertPageModule {}
