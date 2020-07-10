import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';

@Injectable({
  providedIn: 'root'
})
export class SingOutGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean  {
    console.log('home', this.authservice.authenticated);
    return this.authservice.authenStateO.pipe(
      map(auth => {
        console.log(auth);
        if (!auth) {
          this.router.navigate(['/home']);
          return false;
        } else {
          // this.router.navigate(['/info']);
          return true;
        }
      }
    ), take(1));
  }
}
