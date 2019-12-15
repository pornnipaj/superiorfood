import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingGoodsPage } from './incoming-goods.page';

describe('IncomingGoodsPage', () => {
  let component: IncomingGoodsPage;
  let fixture: ComponentFixture<IncomingGoodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingGoodsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingGoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
