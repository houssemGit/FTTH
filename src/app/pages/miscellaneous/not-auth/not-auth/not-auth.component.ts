import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-not-auth',
  templateUrl: './not-auth.component.html',
  styleUrls: ['./not-auth.component.scss']
})
export class NotAuthComponent  {

  constructor(private router: Router) {
  }

  goToHome() {
    this.router.navigateByUrl('/pages/dashboard');
  }

}
