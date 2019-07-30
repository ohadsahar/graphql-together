import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule, MatButtonModule, MatExpansionModule, MatTabsModule, MatDividerModule } from '@angular/material';

@NgModule ({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    MatTabsModule,
    MatDividerModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    MatTabsModule,
    MatDividerModule
  ]
})
export class AngularMaterialModules {


}
