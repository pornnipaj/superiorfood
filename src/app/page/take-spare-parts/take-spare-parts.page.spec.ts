import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeSparePartsPage } from './take-spare-parts.page';

describe('TakeSparePartsPage', () => {
  let component: TakeSparePartsPage;
  let fixture: ComponentFixture<TakeSparePartsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeSparePartsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeSparePartsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
