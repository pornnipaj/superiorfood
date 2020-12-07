import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicserialPage } from './picserial.page';

describe('PicserialPage', () => {
  let component: PicserialPage;
  let fixture: ComponentFixture<PicserialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicserialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicserialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
