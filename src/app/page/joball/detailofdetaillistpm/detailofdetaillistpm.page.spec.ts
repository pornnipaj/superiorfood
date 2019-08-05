import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailofdetaillistpmPage } from './detailofdetaillistpm.page';

describe('DetailofdetaillistpmPage', () => {
  let component: DetailofdetaillistpmPage;
  let fixture: ComponentFixture<DetailofdetaillistpmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailofdetaillistpmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailofdetaillistpmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
