import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem("token");

  // HERE IS WE GET THE RESPONSE FROM LOGIN, ADDING THE TOKEN TO THE HEADER AND RE TRYING ACCESSING THE PROTECTED API WITH THE TOKEN
  const clonedRequest= req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })
  return next(clonedRequest);
};
