import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryEditorComponent } from './beneficiary-editor.component';

describe('BeneficiaryEditorComponent', () => {
  let component: BeneficiaryEditorComponent;
  let fixture: ComponentFixture<BeneficiaryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
