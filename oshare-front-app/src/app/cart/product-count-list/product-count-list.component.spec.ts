import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCountListComponent } from './product-count-list.component';

describe('ProductCountListComponent', () => {
  let component: ProductCountListComponent;
  let fixture: ComponentFixture<ProductCountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
