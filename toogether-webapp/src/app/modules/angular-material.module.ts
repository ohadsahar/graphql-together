import { NgModule } from '@angular/core';

import { MatInputModule, MatCardModule } from '@angular/material';

@NgModule ({
  imports: [
    MatInputModule,
    MatCardModule
  ],
  exports: [
    MatInputModule,
    MatCardModule
  ]
})
export class AngularMaterialModules {


}
