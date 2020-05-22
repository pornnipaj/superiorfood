import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesAcessoryPage } from './devices-acessory.page';

describe('DevicesAcessoryPage', () => {
  let component: DevicesAcessoryPage;
  let fixture: ComponentFixture<DevicesAcessoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesAcessoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesAcessoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
