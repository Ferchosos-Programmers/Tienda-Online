import { CanActivateFn, CanMatchFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('admin') == 'true') {
    return true;
  } else {
    return false;
  }
};

export const login2Guard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('users') == 'true') {
    return true;
  } else {
    return false;
  }
};

export const susucripcionGuard: CanMatchFn = (route, state) => {
  if (localStorage.getItem('token') == 'true') {
    return false;
  } else {
    return true;
  }};
