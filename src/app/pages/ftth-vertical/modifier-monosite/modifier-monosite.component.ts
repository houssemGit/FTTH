import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Monosite } from '../../../_models/monosite';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FtthService } from '../../../_service/ftth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-modifier-monosite',
  templateUrl: './modifier-monosite.component.html',
  styleUrls: ['./modifier-monosite.component.scss']
})
export class ModifierMonositeComponent implements OnInit {


  registerForm: FormGroup;
  loading = false;
  submitted = false;
  status: NbComponentStatus ;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ftthService: FtthService,private toastrService: NbToastrService
  ) {}

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      Num_steg: ["", Validators.required],
      Adresse: ["", Validators.required],
      Nom: ["", [Validators.required]],
      Num_plan: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
    });

    this.registerForm.controls['Num_steg'].setValue(localStorage.getItem('Num_steg'))
    this.registerForm.controls['Adresse'].setValue(localStorage.getItem('Adresse'))
    this.registerForm.controls['Nom'].setValue(localStorage.getItem('Nom_monosite'))
    this.registerForm.controls['Num_plan'].setValue(localStorage.getItem('Num_plan'))

  }

  get fval() {
    return this.registerForm.controls;
  }

  mono= new Monosite

  onFormSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;

    this.mono.ID_sro = Number(localStorage.getItem('ID_sro'))
    this.mono.Num_plan = this.registerForm.controls["Num_plan"].value;
    this.mono.Nom_monosite = this.registerForm.controls["Nom"].value;
    this.mono.Num_steg= this.registerForm.controls["Num_steg"].value;
    this.mono.Adresse= this.registerForm.controls["Adresse"].value;
    this.mono.Pos_tiroir_distribution=localStorage.getItem('Pos_tiroir_distribution')
    this.mono.Type_immeuble=localStorage.getItem('Type_immeuble')



    this.ftthService.updateMono(localStorage.getItem("ID_immeuble"),  this.mono).subscribe(data => {
      this.status="success"
      this.toastrService.show(``,`Monosite modifié avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.router.navigate(['pages/immeubles/gerer-monosite']);

  },error => alert("error Monosite ajout"));
  }


}
