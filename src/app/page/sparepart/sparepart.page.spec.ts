import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparepartPage } from './sparepart.page';

describe('SparepartPage', () => {
  let component: SparepartPage;
  let fixture: ComponentFixture<SparepartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparepartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparepartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
