import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitsparePage } from './waitspare.page';

describe('WaitsparePage', () => {
  let component: WaitsparePage;
  let fixture: ComponentFixture<WaitsparePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitsparePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitsparePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
