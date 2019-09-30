import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmPage } from './cm.page';

describe('CmPage', () => {
  let component: CmPage;
  let fixture: ComponentFixture<CmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
