import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Olt } from "../../../_models/olt";
import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-modifier-olt',
  templateUrl: './modifier-olt.component.html',
  styleUrls: ['./modifier-olt.component.scss']
})
export class ModifierOltComponent implements OnInit {
  status: NbComponentStatus ;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  olt: Olt=new Olt();

  constructor( private toastrService: NbToastrService,   private formBuilder: FormBuilder,
    private router: Router,
    private ftthService: FtthService,) {
      this.registerForm = this.formBuilder.group({
        Nom: ["", Validators.required],
        Localisation: ["", Validators.required],
      });
    }

  ngOnInit() {
    this.registerForm.controls['Nom'].setValue(localStorage.getItem('Nom_olt'))
    this.registerForm.controls['Localisation'].setValue(localStorage.getItem('Localisation'))
  }

  get fval() {
    return this.registerForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;
    this.olt.ID_olt = Number(localStorage.getItem('ID_olt'));
    this.olt.Nom_olt = this.registerForm.controls["Nom"].value;
    this.olt.Localisation = this.registerForm.controls["Localisation"].value;

    this.ftthService.updateOlt(this.olt.ID_olt.toString(),this.olt).subscribe(
      (data)=>{
        this.status="success"
        this.toastrService.show(``,`OLT modifié avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
        this.router.navigate(['pages/zones/gerer-olt']);
     },
      (error)=>{
        this.status="danger"
        this.toastrService.show(``,`Erreur modification`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
        this.loading = false;
      }
    )

  }
  Annuler(){
    this.router.navigate(['pages/zones/gerer-olt']);

  }

}
