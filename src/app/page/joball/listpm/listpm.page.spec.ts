import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpmPage } from './listpm.page';

describe('ListpmPage', () => {
  let component: ListpmPage;
  let fixture: ComponentFixture<ListpmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
