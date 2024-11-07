import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuessGuard } from './auth-guess.guard';

describe('authGuessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
