import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSellerComponent } from './account-seller.component';

describe('AccountSellerComponent', () => {
  let component: AccountSellerComponent;
  let fixture: ComponentFixture<AccountSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
