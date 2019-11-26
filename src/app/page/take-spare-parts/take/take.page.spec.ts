import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakePage } from './take.page';

describe('TakePage', () => {
  let component: TakePage;
  let fixture: ComponentFixture<TakePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
