import { NgModule } from '@angular/core';

import { MatInputModule, MatCardModule, MatButtonModule, MatExpansionModule } from '@angular/material';

@NgModule ({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule
  ]
})
export class AngularMaterialModules {


}
