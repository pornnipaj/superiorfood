import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallPage } from './install.page';

describe('InstallPage', () => {
  let component: InstallPage;
  let fixture: ComponentFixture<InstallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
