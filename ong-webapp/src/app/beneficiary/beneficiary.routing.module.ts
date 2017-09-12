import { BeneficiaryViewerComponent } from './beneficiary-viewer/beneficiary-viewer.component';
import { BeneficiaryEditorComponent } from './beneficiary-editor/beneficiary-editor.component';
import { BeneficiaryListComponent } from './beneficiary-list/beneficiary-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const beneficiaryRoutes: Routes = [
    {path: '',
      component: BeneficiaryListComponent},
    {path: 'add',
      component: BeneficiaryEditorComponent},
    {path: ':id',
      component: BeneficiaryViewerComponent},
    {path: ':id/edit',
      component: BeneficiaryEditorComponent}
];

@NgModule({
    imports: [RouterModule.forChild(beneficiaryRoutes)],
    exports: [RouterModule]
})
export class BeneficiaryRoutingModule {}
