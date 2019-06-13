import { NgModule } from '@angular/core';

import { MatInputModule, MatCardModule, MatButtonModule } from '@angular/material';

@NgModule ({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class AngularMaterialModules {


}
