import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCategoryListComponent } from './transaction-category-list.component';

describe('TransactionCategoryListComponent', () => {
  let component: TransactionCategoryListComponent;
  let fixture: ComponentFixture<TransactionCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
