import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IceimgPage } from './iceimg.page';

describe('IceimgPage', () => {
  let component: IceimgPage;
  let fixture: ComponentFixture<IceimgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceimgPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceimgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
