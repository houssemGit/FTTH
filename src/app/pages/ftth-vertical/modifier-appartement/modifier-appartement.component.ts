import { Component, OnInit } from '@angular/core';
import { Appartement } from '../../../_models/appartement';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FtthService } from '../../../_service/ftth.service';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-modifier-appartement',
  templateUrl: './modifier-appartement.component.html',
  styleUrls: ['./modifier-appartement.component.scss']
})
export class ModifierAppartementComponent implements OnInit {


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

    this.registerForm.controls['Num_steg'].setValue(localStorage.getItem('Num_steg'))
    this.registerForm.controls['Num_appartement'].setValue(localStorage.getItem('Num_appartement'))
    this.registerForm.controls['Num_BE'].setValue(localStorage.getItem('Num_BE'))
    this.registerForm.controls['Num_etage'].setValue(localStorage.getItem('Num_etage'))
    this.registerForm.controls['Nom_bloc'].setValue(localStorage.getItem('Nom_bloc'))
    this.registerForm.controls['NCCCM'].setValue(localStorage.getItem('NCCCM'))
    this.registerForm.controls['Coul_fib'].setValue(localStorage.getItem('Coul_fib'))
    this.registerForm.controls['Coul_tube'].setValue(localStorage.getItem('Coul_tube'))
  }

  get fval() {
    return this.registerForm.controls;
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
  appart: Appartement=new Appartement

  onFormSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;

    this.appart.ID_pri = Number(localStorage.getItem('ID_pri'))
    this.appart.Pos_tiroir_col_montante = localStorage.getItem('Pos_tiroir_col_montante')
    this.appart.Num_BE = this.registerForm.controls["Num_BE"].value;
    this.appart.Num_appartement = this.registerForm.controls["Num_appartement"].value;
    this.appart.Num_etage= this.registerForm.controls["Num_etage"].value;
    this.appart.Nom_Capacite_Cable_Colonne_Montante= this.registerForm.controls["NCCCM"].value;
    this.appart.Couleur_tube= this.registerForm.controls["Coul_fib"].value;
    this.appart.Couleur_fibre= this.registerForm.controls["Coul_tube"].value;
    //this.appart.Pos_tiroir_col_montante= "TC N°: "+this.registerForm.controls["n_c_c"].value+" Position: "+this.registerForm.controls["P_t_c"].value
    //this.appart.IsRaccorde= true
    this.appart.Num_steg= this.registerForm.controls["Num_steg"].value;
    this.appart.Nom_bloc= this.registerForm.controls["Nom_bloc"].value;

    this.ftthService.updateAppart(localStorage.getItem('ID_immeuble'),this.appart).subscribe(data => {
      this.status="success"
      this.toastrService.show(``,`Appartement modifié avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.router.navigate(['pages/immeubles/gerer-appartement']);

  },error => alert("error Appartement modif"));
  }

}
