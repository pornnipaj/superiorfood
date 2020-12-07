import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanserialPage } from './scanserial.page';

describe('ScanserialPage', () => {
  let component: ScanserialPage;
  let fixture: ComponentFixture<ScanserialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanserialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanserialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
