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
  ) {}

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      Nom: ["", Validators.required],
      Zone: ["", Validators.required],
      Nbcasete: ["", Validators.required],
      N_C_T: ["", [Validators.required]],
      olt: ["", [Validators.required]],
    });

//
    this.ftthService.AllOlt().subscribe(data => {
      this.olts=data
      for (let i = 0; i < this.olts.length; i++) {
        this.ch[i]=this.olts[i].Nom_olt
      }

    })
  }


  get nbcasete() {
    return this.registerForm.get("Nbcasete");
  }
  NbCasete(e) {
    this.nbcasete.setValue(e.target.value, { onlySelf: true });
    this.nbc = Number(this.registerForm.controls["Nbcasete"].value);
    this.cassettes = Array(this.nbc);
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

    this.cassette.ID_olt = null;
    this.cassette.ID_immeuble = null;
    this.sro.Nom_sro = this.registerForm.controls["Nom"].value;
    this.sro.Nom_zone = this.registerForm.controls["Zone"].value;
    this.sro.Num_cable_transport = this.registerForm.controls["N_C_T"].value;
    this.nomOlt= this.registerForm.controls["olt"].value;

    this.ftthService.AllOlt().subscribe(data =>
      { this.olts=data
        for (let i = 0; i < this.olts.length; i++) {
          if(this.olts[i].Nom_olt==this.nomOlt){
            this.sro.ID_olt=this.olts[i].ID_olt
          }
        }
    this.ftthService.AjoutSro(this.sro).subscribe(data => {
      this.cassette.ID_sro=data.ID_sro
      for(var i=0;i<this.nbc;i++){
      this.cassette.Num_cassette=i+1;
      this.ftthService.AjoutCassette(this.cassette).subscribe(data => {alert("cassette ajoute")},error => {alert("error cassette ajout");});
    }
      alert("sro ajoute"); this.router.navigate(['pages/zones/gerer-sro']);

  },error => alert("error sro ajout"));


  })
  }



}



