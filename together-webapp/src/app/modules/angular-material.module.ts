import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule, MatButtonModule,
  MatExpansionModule, MatTabsModule, MatDividerModule, MatMenuModule } from '@angular/material';

@NgModule ({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    MatTabsModule,
    MatDividerModule,
    MatMenuModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    MatTabsModule,
    MatDividerModule,
    MatMenuModule
  ]
})
export class AngularMaterialModules {


}
