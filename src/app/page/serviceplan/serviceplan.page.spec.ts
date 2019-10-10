import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceplanPage } from './serviceplan.page';

describe('ServiceplanPage', () => {
  let component: ServiceplanPage;
  let fixture: ComponentFixture<ServiceplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceplanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
