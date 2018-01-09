import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedproductsComponent } from './purchasedproducts.component';

describe('PurchasedproductsComponent', () => {
  let component: PurchasedproductsComponent;
  let fixture: ComponentFixture<PurchasedproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
