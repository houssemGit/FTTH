import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Appartement } from '../../../_models/appartement';

@Component({
  selector: 'ngx-ajout-appartement',
  templateUrl: './ajout-appartement.component.html',
  styleUrls: ['./ajout-appartement.component.scss']
})
export class AjoutAppartementComponent implements OnInit {

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
      Num_appartement: ["", [Validators.required]],
      Num_BE: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      Num_etage: ["", [Validators.required]],
      Nom_bloc: ["", [Validators.required]],
      NCCCM: ["", [Validators.required]],
      Coul_fib:["", Validators.required],
      Coul_tube:["", Validators.required],
    });

  }

  get ctu() {
    return this.registerForm.get("Coul_tube");
  }
  Coul_tube(e) {
    this.ctu.setValue(e.target.value, { onlySelf: true });
  }
  get cfb() {
    return this.registerForm.get("Coul_fib");
  }
  Coul_fib(e) {
    this.cfb.setValue(e.target.value, { onlySelf: true });
  }

  get fval() {
    return this.registerForm.controls;
  }

  appart: Appartement=new Appartement

  onFormSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;

    this.appart.ID_pri = Number(localStorage.getItem('ID_pri'))
    this.appart.Num_BE = this.registerForm.controls["Num_BE"].value;
    this.appart.Num_appartement = this.registerForm.controls["Num_appartement"].value;
    this.appart.Num_etage= this.registerForm.controls["Num_etage"].value;
    this.appart.Num_steg= this.registerForm.controls["Num_steg"].value;
    this.appart.Nom_bloc= this.registerForm.controls["Nom_bloc"].value;
    this.appart.Nom_Capacite_Cable_Colonne_Montante= this.registerForm.controls["NCCCM"].value;
    this.appart.Couleur_tube= this.registerForm.controls["Coul_fib"].value;
    this.appart.Couleur_fibre= this.registerForm.controls["Coul_tube"].value;
    this.appart.IsRaccorde= false
    this.appart.Pos_tiroir_col_montante="Non Raccordé"

    this.ftthService.AjoutAppart(this.appart).subscribe(data => {
      this.status="success"
      this.toastrService.show(``,`Appartement ajouté avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.router.navigate(['pages/immeubles/gerer-appartement']);

  },error => alert("error Appartement ajout"));
  }

}
