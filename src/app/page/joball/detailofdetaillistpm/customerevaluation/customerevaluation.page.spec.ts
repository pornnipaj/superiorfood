import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerevaluationPage } from './customerevaluation.page';

describe('CustomerevaluationPage', () => {
  let component: CustomerevaluationPage;
  let fixture: ComponentFixture<CustomerevaluationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerevaluationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerevaluationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
