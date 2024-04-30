import { TestBed } from '@angular/core/testing';

import { CommentCleanupService } from './comment-cleanup.service';

describe('CommentCleanupService', () => {
  let service: CommentCleanupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentCleanupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
