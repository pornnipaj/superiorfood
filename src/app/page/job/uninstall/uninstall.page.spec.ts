import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UninstallPage } from './uninstall.page';

describe('UninstallPage', () => {
  let component: UninstallPage;
  let fixture: ComponentFixture<UninstallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UninstallPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UninstallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
