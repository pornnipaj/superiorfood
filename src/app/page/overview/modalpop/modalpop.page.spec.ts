import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpopPage } from './modalpop.page';

describe('ModalpopPage', () => {
  let component: ModalpopPage;
  let fixture: ComponentFixture<ModalpopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalpopPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalpopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
