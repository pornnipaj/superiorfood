import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeNewPage } from './take-new.page';

describe('TakeNewPage', () => {
  let component: TakeNewPage;
  let fixture: ComponentFixture<TakeNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
