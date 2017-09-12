import { MaterializeModule } from 'angular2-materialize';
import { CoreModule } from './../core/core.module';
import { FormsModule } from '@angular/forms';
import { BeneficiaryRoutingModule } from './beneficiary.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiaryEditorComponent } from './beneficiary-editor/beneficiary-editor.component';
import { BeneficiaryViewerComponent } from './beneficiary-viewer/beneficiary-viewer.component';
import { BeneficiaryListComponent } from './beneficiary-list/beneficiary-list.component';

@NgModule({
  imports: [
    CommonModule,
    BeneficiaryRoutingModule,
    FormsModule,
    CoreModule,
    MaterializeModule
  ],
  declarations: [BeneficiaryEditorComponent, BeneficiaryViewerComponent, BeneficiaryListComponent]
})
export class BeneficiaryModule { }
