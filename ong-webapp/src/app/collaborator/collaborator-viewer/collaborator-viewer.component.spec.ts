import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorViewerComponent } from './collaborator-viewer.component';

describe('CollaboratorViewerComponent', () => {
  let component: CollaboratorViewerComponent;
  let fixture: ComponentFixture<CollaboratorViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
