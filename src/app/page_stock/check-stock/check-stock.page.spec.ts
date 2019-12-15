import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckStockPage } from './check-stock.page';

describe('CheckStockPage', () => {
  let component: CheckStockPage;
  let fixture: ComponentFixture<CheckStockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckStockPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
