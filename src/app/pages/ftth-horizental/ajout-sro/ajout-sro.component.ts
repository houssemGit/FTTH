import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Cassette } from "../../../_models/cassette";
import { Splitter } from "../../../_models/splitter";
import { Port } from "../../../_models/port";
import { Sro } from '../../../_models/sro';
import { Olt } from '../../../_models/olt';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'ngx-ajout-sro',
  templateUrl: './ajout-sro.component.html',
  styleUrls: ['./ajout-sro.component.scss']
})
export class AjoutSroComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  rest: any
  olts:Array<Olt>= new Array
  sros:Array<Sro>= new Array
  ch: Array<String> = new Array
  ch1: Array<number> = new Array
  n_c_ts: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20,21];
  c_c_ts



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ftthService: FtthService,
  ) {}

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      Nom: ["", Validators.required],
      Zone: ["", Validators.required],
      N_C_T: ["", [Validators.required]],
      C_C_T: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      olt: ["", [Validators.required]],
    });


    this.ftthService.AllOlt().subscribe(data => {
      this.olts=data
      for (let i = 0; i < this.olts.length; i++) {
        this.ch[i]=this.olts[i].Nom_olt
      }
    })

    this.ftthService.AllSro().subscribe(data => {
      this.sros=data
      for (let i = 0; i < this.sros.length; i++) {
        this.ch1[i]=this.sros[i].Num_cable_transport
      }
      this.rest= this.n_c_ts.filter(item => this.ch1.indexOf(item) < 0)
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
    this.sro.Capacite_cable_transport= this.registerForm.controls["C_C_T"].value;
    this.nomOlt= this.registerForm.controls["olt"].value;

    this.ftthService.AllOlt().subscribe(data =>
      { this.olts=data
        for (let i = 0; i < this.olts.length; i++) {
          if(this.olts[i].Nom_olt==this.nomOlt){
            this.sro.ID_olt=this.olts[i].ID_olt
          }
        }
    this.ftthService.AjoutSro(this.sro).subscribe(data => {

      alert("sro ajoute"); this.router.navigate(['pages/zones/gerer-sro']);

  },error => alert("error sro ajout"));


  })
  }



}



