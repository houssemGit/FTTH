import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../_models/user';
import { UserService } from '../../../_service/user.service';
import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-modifier-user',
  templateUrl: './modifier-user.component.html',
  styleUrls: ['./modifier-user.component.scss']
})
export class ModifierUserComponent implements OnInit {

  status: NbComponentStatus ;

  // role Names
  Roles: any = ['Admin', 'Commercial', 'Expert FTTH horizental', 'Expert FTTH vertical']
  constructor(
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
   this.registerForm = this.formBuilder.group({
     Nom: ['', Validators.required],
     Prenom: ['', Validators.required],
     Fonction: ['', Validators.required],
     Email: ['', [Validators.required,Validators.email]],
     Role: ['', [Validators.required]],
     Password: ['', [Validators.required, Validators.minLength(6)]] ,



 });
   }
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  public tata='Select';

  ngOnInit() {

     this.registerForm.controls['Nom'].setValue(localStorage.getItem('Nom'))
     this.registerForm.controls['Prenom'].setValue(localStorage.getItem('Prenom'))
     this.registerForm.controls['Email'].setValue(localStorage.getItem('Email'))
     this.registerForm.controls['Password'].setValue(localStorage.getItem('Password'))
     this.registerForm.controls['Fonction'].setValue(localStorage.getItem('Fonction'))
     this.registerForm.controls['Role'].setValue(localStorage.getItem('Role'))
  }


  user: User = new User();


  get fval() { return this.registerForm.controls; }

  onFormSubmit(){
    this.submitted = true;
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }

    this.loading = true;
    this.user.Id = Number(localStorage.getItem('ID_user'));
    this.user.Nom = this.registerForm.controls["Nom"].value;
    this.user.Prenom = this.registerForm.controls["Prenom"].value;
    this.user.Email = this.registerForm.controls["Email"].value;
    this.user.Password = this.registerForm.controls["Password"].value;
    this.user.Fonction = this.registerForm.controls["Fonction"].value;
    this.user.Role = this.registerForm.controls["Role"].value;

    this.userService.modifyuser(this.user, localStorage.getItem('ID_user')).subscribe(
      (data)=>{
        this.status="warning"
        this.toastrService.show(``,`Utilisateur modifié!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});        this.loading = false;
        this.router.navigate(['pages/utilisateurs/gestion-user']);
     },
      (error)=>{
        this.status="danger"
        this.toastrService.show(``,`Utilisateur existe déjà!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});        this.loading = false;
      }
    )

  }
  annuler(){
    this.router.navigate(['pages/utilisateurs/gestion-user']);
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
