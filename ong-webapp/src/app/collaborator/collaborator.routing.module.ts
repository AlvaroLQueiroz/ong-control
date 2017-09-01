import { CollaboratorViewerComponent } from './collaborator-viewer/collaborator-viewer.component';
import { CollaboratorEditorComponent } from './collaborator-editor/collaborator-editor.component';
import { CollaboratorListComponent } from './collaborator-list/collaborator-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const collaboratorRoutes: Routes = [
    {path: '',
      component: CollaboratorListComponent},
    {path: 'add',
      component: CollaboratorEditorComponent},
    {path: ':id',
      component: CollaboratorViewerComponent},
    {path: ':id/edit',
      component: CollaboratorEditorComponent}
];

@NgModule({
    imports: [RouterModule.forChild(collaboratorRoutes)],
    exports: [RouterModule]
})
export class CollaboratorRoutingModule {}
