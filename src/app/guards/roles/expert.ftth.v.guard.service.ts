import { Injectable } from '@angular/core';
import { RouterStateSnapshot, CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../_service/auth.service';


@Injectable({
  providedIn: 'root'
})

export class ExpertFtthVGuardService implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

    if (this.authService.checkAvailability()){
      if (this.authService.getRole() === 'Commercial' || this.authService.getRole() === 'Expert FTTH horizental'){
        this.router.navigateByUrl('/pages/miscellaneous/403')
      }

    }else { this.router.navigateByUrl('/auth/login') ;}

    return !(this.authService.getRole() === 'Commercial' || this.authService.getRole() === 'Expert FTTH horizental');

  }



}

