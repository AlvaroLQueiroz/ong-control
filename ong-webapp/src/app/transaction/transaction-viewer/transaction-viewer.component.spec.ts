import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionViewerComponent } from './transaction-viewer.component';

describe('TransactionViewerComponent', () => {
  let component: TransactionViewerComponent;
  let fixture: ComponentFixture<TransactionViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
