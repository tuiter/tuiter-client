import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot} from '@angular/router';
import {Injectable, OnDestroy} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthenticationService,
              private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn();

  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

}
