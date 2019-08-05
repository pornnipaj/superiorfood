import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarpmPage } from './calendarpm.page';

describe('CalendarpmPage', () => {
  let component: CalendarpmPage;
  let fixture: ComponentFixture<CalendarpmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarpmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarpmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
