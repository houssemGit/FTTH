import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Pri } from '../../../_models/pri';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FtthService } from '../../../_service/ftth.service';
import { Router } from '@angular/router';
import { Sro } from '../../../_models/sro';

@Component({
  selector: 'ngx-modifier-pri',
  templateUrl: './modifier-pri.component.html',
  styleUrls: ['./modifier-pri.component.scss']
})
export class ModifierPriComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  status: NbComponentStatus;

  rest: any
  sros:Array<Sro>= new Array
  pris:Array<Pri>= new Array
  ch: Array<String> = new Array
  ch1: Array<number> = new Array
  con =["Signée" , "Non signée", "En cours"]
  racc =["Raccordé", "Autorisation", "Travaux en cours", "Non raccordé"]
  ssro : Sro


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ftthService: FtthService,private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Nom_pri: ["", Validators.required],
      Nom_residence: ["", Validators.required],
      N_C_C_D: ["", [Validators.required]],
      Nb_prise : ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      Num_plan : ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      Nom_syndique: ["", [Validators.required]],
      Num_syndique: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}')])],
      sro: ["", [Validators.required]],
      Adresse: ['', Validators.required],
      Etat_convention:['', Validators.required],
      Etat_raccordement:['', Validators.required],
    });

    this.registerForm.controls['Nom_pri'].setValue(localStorage.getItem('Nom_pri'))
    this.registerForm.controls['Nom_residence'].setValue(localStorage.getItem('Nom_residence'))
    this.registerForm.controls['N_C_C_D'].setValue(localStorage.getItem('N_C_C_D'))
    this.registerForm.controls['Nb_prise'].setValue(localStorage.getItem('Nb_prise'))
    this.registerForm.controls['Num_plan'].setValue(localStorage.getItem('Num_plan'))
    this.registerForm.controls['Nom_syndique'].setValue(localStorage.getItem('Nom_syndique'))
    this.registerForm.controls['Num_syndique'].setValue(localStorage.getItem('Num_syndique'))
    this.registerForm.controls['Adresse'].setValue(localStorage.getItem('Adresse'))
    this.registerForm.controls['Etat_convention'].setValue(localStorage.getItem('Etat_convention'))
    this.registerForm.controls['Etat_raccordement'].setValue(localStorage.getItem('Etat_raccordement'))



    this.ftthService.getSroById(localStorage.getItem('ID_sro')).subscribe(data => {
      this.ssro= data
    this.registerForm.controls['sro'].setValue(this.ssro.Nom_sro)
  },error => {alert('sro not found ')})


    this.ftthService.AllSro().subscribe(data => {
      this.sros=data
      for (let i = 0; i < this.sros.length; i++) {
        this.ch[i]=this.sros[i].Nom_sro
      }
    })



  }



   get sor() {
    return this.registerForm.get("sro");
  }
  sro(e) {
    this.sor.setValue(e.target.value, { onlySelf: true });
  }

  get cc() {
    return this.registerForm.get("Etat_convention");
  }
  Etat_convention(e) {
    this.cc.setValue(e.target.value, { onlySelf: true });
  }
   get ce() {
    return this.registerForm.get("Etat_raccordement");
  }
  Etat_raccordement(e) {
    this.ce.setValue(e.target.value, { onlySelf: true });
  }

  get fval() {
    return this.registerForm.controls;
  }

  pri: Pri = new Pri()
  nomSRO:string

  onFormSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;


    this.pri.Nom_pri = this.registerForm.controls["Nom_pri"].value;
    this.pri.Nom_residence = this.registerForm.controls["Nom_residence"].value;
    this.pri.Nom_Capacite_cable_distribution = this.registerForm.controls["N_C_C_D"].value;
    this.pri.Nb_prise = this.registerForm.controls["Nb_prise"].value;
    this.pri.Num_plan = this.registerForm.controls["Num_plan"].value;
    this.pri.Nom_syndique = this.registerForm.controls["Nom_syndique"].value;
    this.pri.Num_syndique = this.registerForm.controls["Num_syndique"].value;
    this.pri.Adresse = this.registerForm.controls["Adresse"].value;
    this.nomSRO= this.registerForm.controls["sro"].value;
    this.pri.Etat_convention=this.registerForm.controls["Etat_convention"].value
    this.pri.Etat_raccordement=this.registerForm.controls["Etat_raccordement"].value

    this.ftthService.AllSro().subscribe(data =>
      { this.sros=data
        for (let i = 0; i < this.sros.length; i++) {
          if(this.sros[i].Nom_sro==this.nomSRO){
            this.pri.ID_sro=this.sros[i].ID_olt
          }
        }

    this.ftthService.updatePri(localStorage.getItem('ID_pri'),this.pri).subscribe(data => {

      this.status="warning"
      this.toastrService.show(``,`PRI modifié avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.router.navigate(['pages/immeubles/gerer-pri']);

  },error => alert("error pri ajout"));


  })
  }

}
