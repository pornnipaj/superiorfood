import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoballPage } from './joball.page';

describe('JoballPage', () => {
  let component: JoballPage;
  let fixture: ComponentFixture<JoballPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoballPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoballPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
