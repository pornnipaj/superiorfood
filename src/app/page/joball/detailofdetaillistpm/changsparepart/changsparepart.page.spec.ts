import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangsparepartPage } from './changsparepart.page';

describe('ChangsparepartPage', () => {
  let component: ChangsparepartPage;
  let fixture: ComponentFixture<ChangsparepartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangsparepartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangsparepartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
