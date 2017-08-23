import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletEditorComponent } from './wallet-editor.component';

describe('WalletEditorComponent', () => {
  let component: WalletEditorComponent;
  let fixture: ComponentFixture<WalletEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
