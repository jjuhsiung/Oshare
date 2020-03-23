import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCountItemComponent } from './product-count-item.component';

describe('ProductCountItemComponent', () => {
  let component: ProductCountItemComponent;
  let fixture: ComponentFixture<ProductCountItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCountItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCountItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
