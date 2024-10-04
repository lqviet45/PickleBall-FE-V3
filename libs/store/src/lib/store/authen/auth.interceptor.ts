import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');

  // List of routes that do not require a token
  const excludedRoutes = [
    '/api/register',
    '/api/forgot-password',
    '/api/'
  ];

  // Check if the request URL matches any of the excluded routes
  const isExcluded = excludedRoutes.some(route => req.url.includes(route));

  // Clone the request without the token if it's an excluded route
  if (isExcluded) {
    return next(req); // Proceed without attaching the token
  }

  // Otherwise, clone the request and add the Authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });

  return next(authReq);
};
