import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowimginstallPage } from './showimginstall.page';

describe('ShowimginstallPage', () => {
  let component: ShowimginstallPage;
  let fixture: ComponentFixture<ShowimginstallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowimginstallPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowimginstallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
