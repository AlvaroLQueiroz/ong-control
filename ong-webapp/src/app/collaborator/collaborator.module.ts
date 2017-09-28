import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './../core/core.module';
import { CollaboratorRoutingModule } from './collaborator.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaboratorListComponent } from './collaborator-list/collaborator-list.component';
import { CollaboratorEditorComponent } from './collaborator-editor/collaborator-editor.component';
import { CollaboratorViewerComponent } from './collaborator-viewer/collaborator-viewer.component';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule, CollaboratorRoutingModule, FormsModule, CoreModule, MaterializeModule, TextMaskModule
  ],
  declarations: [CollaboratorListComponent, CollaboratorEditorComponent, CollaboratorViewerComponent]
})
export class CollaboratorModule { }
