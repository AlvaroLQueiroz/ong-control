import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryViewerComponent } from './beneficiary-viewer.component';

describe('BeneficiaryViewerComponent', () => {
  let component: BeneficiaryViewerComponent;
  let fixture: ComponentFixture<BeneficiaryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
