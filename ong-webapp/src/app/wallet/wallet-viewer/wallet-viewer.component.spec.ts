import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletViewerComponent } from './wallet-viewer.component';

describe('WalletViewerComponent', () => {
  let component: WalletViewerComponent;
  let fixture: ComponentFixture<WalletViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
