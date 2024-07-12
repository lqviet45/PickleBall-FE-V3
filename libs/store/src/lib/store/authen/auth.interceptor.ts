import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor : HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');
  req = req.clone({
    setHeaders: {
      Authorization: token ? `bearer ${token}` : ''
    }
  });
  return next(req);
};
