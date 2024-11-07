import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuessGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localData = localStorage.getItem("angular18Login"); // Corrected key

  if (localData != null) {
    router.navigateByUrl("dashboard");
    return false;
  } else {
    return true;
  }
};

