import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCategoryViewerComponent } from './transaction-category-viewer.component';

describe('TransactionCategoryViewerComponent', () => {
  let component: TransactionCategoryViewerComponent;
  let fixture: ComponentFixture<TransactionCategoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionCategoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCategoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
