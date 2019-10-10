import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuheadPage } from './menuhead.page';

describe('MenuheadPage', () => {
  let component: MenuheadPage;
  let fixture: ComponentFixture<MenuheadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuheadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuheadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
