import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillistpmPage } from './detaillistpm.page';

describe('DetaillistpmPage', () => {
  let component: DetaillistpmPage;
  let fixture: ComponentFixture<DetaillistpmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaillistpmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaillistpmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
