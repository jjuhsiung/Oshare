import { TestBed } from '@angular/core/testing';

import { PostImageService } from './post-image.service';

describe('PostImageService', () => {
  let service: PostImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
