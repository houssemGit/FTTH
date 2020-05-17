import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { Pri } from '../../../_models/pri';
import { Sro } from '../../../_models/sro';

@Component({
  selector: 'ngx-ajout-pri',
  templateUrl: './ajout-pri.component.html',
  styleUrls: ['./ajout-pri.component.scss']
})
export class AjoutPriComponent implements OnInit {


  registerForm: FormGroup;
  loading = false;
  submitted = false;
  status: NbComponentStatus ;

  rest: any
  sros:Array<Sro>= new Array
  pris:Array<Pri>= new Array
  ch: Array<String> = new Array
  ch1: Array<number> = new Array
  con = ['oui','en cours','non']



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
      sro: ["", [Validators.required]],
      Nb_prise: ["", Validators.required],
      Num_plan: ["", Validators.required],
      Nom_syndique: ["", Validators.required],
      Num_syndique: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}')])],
      Adresse: ['', Validators.required],
      convention:['', Validators.required],
      delai:['', Validators.required]
    });

    // affichage des zones
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
    return this.registerForm.get("convention");
  }
  convention(e) {
    this.cc.setValue(e.target.value, { onlySelf: true });
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
    this.pri.Nb_prise= this.registerForm.controls["Nb_prise"].value;
    this.pri.Num_plan= this.registerForm.controls["Num_plan"].value;
    this.pri.Nom_syndique= this.registerForm.controls["Nom_syndique"].value;
    this.pri.Num_syndique= this.registerForm.controls["Num_syndique"].value;
    this.pri.Adresse= this.registerForm.controls["Adresse"].value;
    this.pri.Etat=this.registerForm.controls["convention"].value +"-"+this.registerForm.controls["delai"].value;



    this.nomSRO= this.registerForm.controls["sro"].value;

    this.ftthService.AllSro().subscribe(data =>
      { this.sros=data
        for (let i = 0; i < this.sros.length; i++) {
          if(this.sros[i].Nom_sro==this.nomSRO){
            this.pri.ID_sro=this.sros[i].ID_sro
          }
        }
    this.ftthService.AjoutPri(this.pri).subscribe(data => {

      this.status="success"
      this.toastrService.show(``,`PRI ajouté avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.router.navigate(['pages/immeubles/gerer-pri']);

  },error => alert("error pri ajout"));


  })
  }
}
