import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Olt } from "../../../_models/olt";
@Component({
  selector: 'ngx-modifier-olt',
  templateUrl: './modifier-olt.component.html',
  styleUrls: ['./modifier-olt.component.scss']
})
export class ModifierOltComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  olt: Olt=new Olt();

  constructor(    private formBuilder: FormBuilder,
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
    localStorage.setItem('ID_olt','')
    this.olt.Nom_olt = this.registerForm.controls["Nom"].value;
    this.olt.Localisation = this.registerForm.controls["Localisation"].value;

    this.ftthService.updateOlt(this.olt.ID_olt.toString(),this.olt).subscribe(
      (data)=>{
        alert('Olt modifie avec sucess!!');
        this.router.navigate(['pages/zones/gerer-olt']);
     },
      (error)=>{
        alert('error modification!!');
        //this.toastr.error(error.error.message, 'Error');
        this.loading = false;
      }
    )
  }

}
