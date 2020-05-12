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
  n_c_ds: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ftthService: FtthService,private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Nom_pri: ["", Validators.required],
      Nom_residence: ["", Validators.required],
      N_C_D: ["", [Validators.required]],
      Nb_prise : ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      Num_plan : ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      Nom_syndique: ["", [Validators.required]],
      Num_syndique: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}')])],
      sro: ["", [Validators.required]],
    });

    this.registerForm.controls['Nom_pri'].setValue(localStorage.getItem('Nom_pri'))
    this.registerForm.controls['Nom_residence'].setValue(localStorage.getItem('Nom_residence'))
    this.registerForm.controls['N_C_D'].setValue(localStorage.getItem('N_c_d'))
    this.registerForm.controls['Nb_prise'].setValue(localStorage.getItem('Nb_prise'))
    this.registerForm.controls['Num_plan'].setValue(localStorage.getItem('Num_plan'))
    this.registerForm.controls['Nom_syndique'].setValue(localStorage.getItem('Nom_syndique'))
    this.registerForm.controls['Num_syndique'].setValue(localStorage.getItem('Num_syndique'))
    this.ftthService.getSroById(localStorage.getItem('ID_sro')).subscribe(data => {
    this.registerForm.controls['sro'].setValue(data.Nom_sro)},error => {alert('sro not found ')})


    this.ftthService.AllSro().subscribe(data => {
      this.sros=data
      for (let i = 0; i < this.sros.length; i++) {
        this.ch[i]=this.sros[i].Nom_sro
      }
    })

    this.ftthService.getPriByZone(localStorage.getItem('ID_sro')).subscribe(data => {
      this.pris=data
      for (let i = 0; i < this.pris.length; i++) {
        this.ch1[i]=this.pris[i].Num_cable_distribution
      }
      this.rest= this.n_c_ds.filter(item => this.ch1.indexOf(item) < 0)
    },error => this.rest=this.n_c_ds)


  }


  get n_c_t() {
    return this.registerForm.get("N_C_D");
  }
  N_C_T(e) {
    this.n_c_t.setValue(e.target.value, { onlySelf: true });
  }
   get sor() {
    return this.registerForm.get("sro");
  }
  sro(e) {
    this.sor.setValue(e.target.value, { onlySelf: true });
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
    this.pri.Num_cable_distribution = this.registerForm.controls["N_C_D"].value;
    this.pri.Nb_prise = this.registerForm.controls["Nb_prise"].value;
    this.pri.Num_plan = this.registerForm.controls["Num_plan"].value;
    this.pri.Nom_syndique = this.registerForm.controls["Nom_syndique"].value;
    this.pri.Num_syndique = this.registerForm.controls["Num_syndique"].value;
    this.nomSRO= this.registerForm.controls["sro"].value;

    this.ftthService.AllSro().subscribe(data =>
      { this.sros=data
        for (let i = 0; i < this.sros.length; i++) {
          if(this.sros[i].Nom_sro==this.nomSRO){
            this.pri.ID_sro=this.sros[i].ID_olt
          }
        }

    this.ftthService.updatePri(localStorage.getItem('ID_pri'),this.pri).subscribe(data => {

      this.status="success"
      this.toastrService.show(``,`PRI ajouté avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.router.navigate(['pages/immeubles/gerer-pri']);

  },error => alert("error pri ajout"));


  })
  }

}
