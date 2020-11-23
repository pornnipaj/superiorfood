import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsWaitingListPage } from './parts-waiting-list.page';

describe('PartsWaitingListPage', () => {
  let component: PartsWaitingListPage;
  let fixture: ComponentFixture<PartsWaitingListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsWaitingListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsWaitingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
