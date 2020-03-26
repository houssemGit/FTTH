import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Olt } from "../../../_models/olt";
import { Cassette } from "../../../_models/cassette";
import { Splitter } from "../../../_models/splitter";
import { Port } from "../../../_models/port";
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "ngx-ajout-olt",
  templateUrl: "./ajout-olt.component.html",
  styleUrls: ["./ajout-olt.component.scss"]
})
export class AjoutOltComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;



  // role Names
  //Typespts: any = [2, 4, 8, 16, 32, 64];
  nbcasetes: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  nbc: number;
  //nbp: number;
  cassettes: any;
  //ports: any;

  bool: boolean;
  //accordion: Array<{ num_cast: number, num_port: number, port: boolean }> = new Array()
  //accordion1: Array<{ num_cast: number, num_port: number, port: boolean }> = new Array()



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ftthService: FtthService,
  ) {}

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      Nom: ["", Validators.required],
      Localisation: ["", Validators.required],
      nbcasete: ["", Validators.required],
      //Typespt: ["", [Validators.required]]
    });
  }

  // Getter method to access formcontrols
  get nbcasete() {
    return this.registerForm.get("nbcasete");
  }
  // Choose role using select dropdown
  nbCasete(e) {
    this.nbcasete.setValue(e.target.value, { onlySelf: true });
    this.nbc = Number(this.registerForm.controls["nbcasete"].value);
    this.cassettes = Array(this.nbc);
  }
  get typespt() {
    return this.registerForm.get("Typespt");
  }
  /*
  Typespt(e) {
    this.typespt.setValue(e.target.value, { onlySelf: true });
    this.nbp = Number(this.registerForm.controls["Typespt"].value);
    this.ports = Array(this.nbp);
  }
  */

  get fval() {
    return this.registerForm.controls;
  }

  olt: Olt = new Olt()
  cassette: Cassette = new Cassette()

  onFormSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;
    /*
    //stockage de l'etat final de l'olt dans accordion1
    this.accordion1 = []
    for (var i = 1; i <= this.nbc; i++) {
      for (var j = 1; j <= this.nbp; j++) {
        var k = 0; var baal=false;
          while(k < this.accordion.length && baal==false){
              if (this.accordion[k].num_cast==i && this.accordion[k].num_port==j )
              {this.accordion1.push({ num_cast: i, num_port: j, port: true }); baal=true}
              else  {k++;}

          }
          if(baal== false) this.accordion1.push({ num_cast: i, num_port: j, port: false });
      }
    }
    console.log(this.accordion1)
    */

    console.log(this.cassette.ID_olt)
    this.cassette.ID_sro = null;
    this.cassette.ID_immeuble = null;
    this.olt.Nom_olt = this.registerForm.controls["Nom"].value;
    this.olt.Localisation = this.registerForm.controls["Localisation"].value;
    this.ftthService.AjoutOlt(this.olt).subscribe(data => {
      this.cassette.ID_olt=data.ID_olt
      for(var i=0;i<this.nbc;i++){
      this.cassette.Num_cassette=i+1;
      this.ftthService.AjoutCassette(this.cassette).subscribe(data => {alert("cassette ajoute")},error => {alert("error cassette ajout");});

    }
      alert("olt ajoute"); this.router.navigate(['pages/zones/gerer-olt']);

  },error => alert("error olt ajout"));




/*
    this.splitter.Type_splitter = this.registerForm.controls["Typespt"].value;

    var n=0;
    var stop=false;
    while(n<this.nbc && stop==false)
    {
      this.cassette.ID_cassette=null
      this.cassette.Num_cassette = this.accordion1[n].num_cast
      this.ftthService.AjoutCassette(this.cassette).subscribe(data => alert("cassette ajoute"),error => {alert("error cassette ajout");stop=true;});

      if (stop==false) {
     // this.splitter.ID_splitter=this.accordion1[i].num_port;;
      this.splitter.ID_cassette = this.accordion1[n].num_cast;
      this.splitter.Position = this.accordion1[n].num_port;
      this.ftthService.AjoutSplitter(this.splitter).subscribe(data => alert("splitter ajoute"),error => {alert("error splitter ajout");stop=true;});
    }
    n++;
    }

    var m=0;
    var stop1=false;
    while(m<this.accordion1.length && stop1==false && stop==false)
    {
      this.port.ID_port=null
      this.port.Etat = this.accordion1[m].port
      this.port.ID_splitter = this.accordion1[m].num_port;
      this.ftthService.AjoutPort(this.port).subscribe(data => alert("port ajoute"),error => {alert("error port ajout");stop1=true;});
    m++
    }
    */
  }


}
