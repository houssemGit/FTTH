import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  // canActivate = () => {
  //   if (this.authService.checkAvailability()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/auth/login']);
  //     return false;
  //   }
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {


    if (this.authService.checkAvailability()){
      return true;

    }else { this.router.navigateByUrl('/auth/login') ;}



  }
}
