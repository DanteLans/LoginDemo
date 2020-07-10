import { TestBed } from '@angular/core/testing';

import { SingOutGuard } from './sing-out.guard';

describe('SingOutGuard', () => {
  let guard: SingOutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SingOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
