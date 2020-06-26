import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_service/auth.service';

@Component({
  selector: 'ngx-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.scss']
})
export class CheckEmailComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService) {
  }

  goToHome() {
    if(localStorage.getItem('Email'))
    this.router.navigateByUrl('/pages/dashboard');
    else this.router.navigateByUrl('/auth/login');
  }

  ngOnInit() {
    if(localStorage.getItem('Email')!=null) {
     this.authService.reset_psw_email(localStorage.getItem('Email')).subscribe(data=>{},error =>{});}

  }

}
