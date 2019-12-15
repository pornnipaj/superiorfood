import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranferPage } from './tranfer.page';

describe('TranferPage', () => {
  let component: TranferPage;
  let fixture: ComponentFixture<TranferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranferPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
