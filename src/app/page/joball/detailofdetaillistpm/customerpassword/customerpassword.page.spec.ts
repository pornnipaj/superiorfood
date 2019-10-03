import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerpasswordPage } from './customerpassword.page';

describe('CustomerpasswordPage', () => {
  let component: CustomerpasswordPage;
  let fixture: ComponentFixture<CustomerpasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerpasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
