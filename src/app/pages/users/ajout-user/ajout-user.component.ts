import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../_models/user';
import { UserService } from '../../../_service/user.service';

@Component({
  selector: 'ngx-ajout-user',
  templateUrl: './ajout-user.component.html',
  styleUrls: ['./ajout-user.component.scss']
})
export class AjoutUserComponent implements OnInit {
 // role Names
 Roles: any = ['Admin', 'Commercial', 'Expert FTTH horizental', 'Expert FTTH vertical']
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) { }
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  public tata='Select';

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Nom: ['', Validators.required],
      Prenom: ['', Validators.required],
      Fonction: ['', Validators.required],
      Email: ['', [Validators.required,Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]] ,
      Role: ['', [Validators.required]],

  });
  }




  get fval() { return this.registerForm.controls; }

  onFormSubmit(){
    this.submitted = true;

    // return for here if form is invalid
    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;
    // this.registerForm.value f 3oudh user
    this.userService.adduser(this.registerForm.value).subscribe(
      (data)=>{
        alert('User Registered successfully!!');
        this.router.navigate(['pages/utilisateurs/gestion-user']);
     },
      (error)=>{
        this.toastr.error(error.error.message, 'Error');
        this.loading = false;
      }
    )

  }
    // Getter method to access formcontrols
    get roleName() {
      return this.registerForm.get('Role');
    }
   // Choose role using select dropdown
   changeRole(e) {
    console.log(e.value)
    this.roleName.setValue(e.target.value, {
      onlySelf: true
    })
  }


}


