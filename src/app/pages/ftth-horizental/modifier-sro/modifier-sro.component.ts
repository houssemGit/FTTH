import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Cassette } from "../../../_models/cassette";
import { Sro } from '../../../_models/sro';
import { Olt } from '../../../_models/olt';
@Component({
  selector: 'ngx-modifier-sro',
  templateUrl: './modifier-sro.component.html',
  styleUrls: ['./modifier-sro.component.scss']
})
export class ModifierSroComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  olts:Array<Olt>= new Array
  ch: Array<String> = new Array
  nbcasetes: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  n_c_ts: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  nbc: number;
  cassettes: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ftthService: FtthService,
  ) {
    this.registerForm = this.formBuilder.group({
      Nom: ["", Validators.required],
      Zone: ["", Validators.required],
      N_C_T: ["", [Validators.required]],
      olt: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.registerForm.controls['Nom'].setValue(localStorage.getItem('Nom_sro'))
    this.registerForm.controls['Zone'].setValue(localStorage.getItem('Nom_zone'))
    this.registerForm.controls['N_C_T'].setValue(localStorage.getItem('Num_cable_transport'))
    this.ftthService.getOltById(Number(localStorage.getItem('ID_olt'))).subscribe(data => {this.registerForm.controls['olt'].setValue(data.Nom_olt)},error => {alert('olt not found ')})
    localStorage.setItem('Nom_sro','')
    localStorage.setItem('Nom_zone','')
    localStorage.setItem('Num_cable_transport','')
    localStorage.setItem('ID_olt','')

    this.ftthService.AllOlt().subscribe(data => {
      this.olts=data
      for (let i = 0; i < this.olts.length; i++) {
        this.ch[i]=this.olts[i].Nom_olt
      }

    })
  }

  get n_c_t() {
    return this.registerForm.get("N_C_T");
  }
  N_C_T(e) {
    this.n_c_t.setValue(e.target.value, { onlySelf: true });
  }
   get otl() {
    return this.registerForm.get("olt");
  }
  olt(e) {
    this.otl.setValue(e.target.value, { onlySelf: true });
  }

  get fval() {
    return this.registerForm.controls;
  }

  sro: Sro = new Sro()
  cassette: Cassette = new Cassette()
  nomOlt:string

  onFormSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;

    this.sro.Nom_sro = this.registerForm.controls["Nom"].value;
    this.sro.Nom_zone = this.registerForm.controls["Zone"].value;
    this.sro.Num_cable_transport = this.registerForm.controls["N_C_T"].value;
    this.nomOlt= this.registerForm.controls["olt"].value;

    //Allolt a effacer
    this.ftthService.AllOlt().subscribe(data =>
      { this.olts=data
        for (let i = 0; i < this.olts.length; i++) {
          if(this.olts[i].Nom_olt==this.nomOlt){
            this.sro.ID_olt=this.olts[i].ID_olt
          }
        }
    this.ftthService.updateSro(localStorage.getItem('ID_sro') ,this.sro).subscribe(data => {alert("sro modif"); this.router.navigate(['pages/zones/gerer-sro']);
  },error => alert("error sro modif"));

  })
  }
}




