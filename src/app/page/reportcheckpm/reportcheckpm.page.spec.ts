import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportcheckpmPage } from './reportcheckpm.page';

describe('ReportcheckpmPage', () => {
  let component: ReportcheckpmPage;
  let fixture: ComponentFixture<ReportcheckpmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportcheckpmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportcheckpmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
