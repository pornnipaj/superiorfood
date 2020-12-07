import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorknewPage } from './worknew.page';

describe('WorknewPage', () => {
  let component: WorknewPage;
  let fixture: ComponentFixture<WorknewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorknewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorknewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
