import { TestBed } from '@angular/core/testing';

import { ProductCountService } from './product-count.service';

describe('ProductCountService', () => {
  let service: ProductCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
