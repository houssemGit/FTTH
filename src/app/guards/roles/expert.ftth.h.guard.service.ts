import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../_service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ExpertFtthHGuardService implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.authService.checkAvailability()){
      if (this.authService.getRole() === 'Commercial' || this.authService.getRole() === 'Expert FTTH vertical'){
        this.router.navigateByUrl('/pages/miscellaneous/403')
      }

    }else { this.router.navigateByUrl('/auth/login') ;}

    return !(this.authService.getRole() === 'Commercial' || this.authService.getRole() === 'Expert FTTH vertical');

  }



}
