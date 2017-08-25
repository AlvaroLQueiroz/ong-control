import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCategoryEditorComponent } from './transaction-category-editor.component';

describe('TransactionCategoryEditorComponent', () => {
  let component: TransactionCategoryEditorComponent;
  let fixture: ComponentFixture<TransactionCategoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionCategoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCategoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
