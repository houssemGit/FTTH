import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../_models/user';
import { UserService } from '../../../_service/user.service';
import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';

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
    private toastrService: NbToastrService) { }

  status: NbComponentStatus ;
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



  user: User;
  get fval() { return this.registerForm.controls; }

  onFormSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }

    this.loading = true;
    this.userService.adduser(this.registerForm.value).subscribe(
      (data)=>{
        this.user=<User>data;
        this.status="success"
        this.toastrService.show(``,`Utilisateur ajouté avec succès!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
        this.router.navigate(['pages/utilisateurs/gestion-user']);
     },
      (error)=>{
        this.status="danger"
        this.toastrService.show(``,`'Utilisateur existe déjà!'`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
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
    this.roleName.setValue(e.target.value, {
      onlySelf: true
    })
  }


}


