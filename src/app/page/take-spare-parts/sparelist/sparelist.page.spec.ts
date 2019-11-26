import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparelistPage } from './sparelist.page';

describe('SparelistPage', () => {
  let component: SparelistPage;
  let fixture: ComponentFixture<SparelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparelistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
