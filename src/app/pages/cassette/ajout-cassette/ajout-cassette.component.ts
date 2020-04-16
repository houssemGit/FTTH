import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Splitter } from '../../../_models/splitter';
import { Cassette } from '../../../_models/cassette';
import { Port } from '../../../_models/port';

@Component({
  selector: 'ngx-ajout-cassette',
  templateUrl: './ajout-cassette.component.html',
  styleUrls: ['./ajout-cassette.component.scss']
})
export class AjoutCassetteComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  rest: any
  Nbsplts: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20];
  Typespts: any = [2, 4, 8, 16, 32, 64];
  nbs: number;
  nbp: number;
  cassette: Cassette = new Cassette()
  splitter: Splitter = new Splitter()
  port: Port=new Port();

  allPositions:Array<Number>= new Array
  cassettes: Array<Cassette>;


  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private ftthService: FtthService,) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      NmCasete: ["", Validators.required],
      Nbsplt: ["", Validators.required],
      Typespt: ["", Validators.required],
      Nom: ["", Validators.required]
    });
    this.rest=this.Nbsplts
    this.cassettes=[]
    this.ftthService.getByOlt(Number(localStorage.getItem('ID_olt'))).subscribe(data => {this.cassettes = data;
    for (let i = 0; i < this.cassettes.length; i++) {
      this.allPositions[i]= this.cassettes[i].Num_cassette
    }
    this.rest= this.Nbsplts.filter(item => this.allPositions.indexOf(item) < 0)
    },error => alert('pas de cassette!'));

  }

   get nmcasete() {
    return this.registerForm.get("NmCasete");
  }
  NmCasete(e) {
    this.nmcasete.setValue(e.target.value, { onlySelf: true });
  }

  get nbsplt() {
    return this.registerForm.get("Nbsplt");
  }
  splitters : any;
  Nbsplt(e) {
    this.nbsplt.setValue(e.target.value, { onlySelf: true });
    this.nbs = Number(this.registerForm.controls["Nbsplt"].value);
    this.splitters = Array(this.nbs);
  }

  get typespt() {
    return this.registerForm.get("Typespt");
  }
  ports : any;
  Typespt(e) {
    this.typespt.setValue(e.target.value, { onlySelf: true });
    this.nbp = Number(this.registerForm.controls["Typespt"].value);
    this.ports = Array(this.nbp);
  }


  get fval() {
    return this.registerForm.controls;
  }


   bool: Boolean
   accordion: Array<{ num_splt: number, num_port: number, port: string }> = new Array()
   accordion1: Array<{ num_splt: number, num_port: number, port: string }> = new Array()
  // fonction qui detecte le changement d'etat des ports
  cheky(x,y) {
    this.bool=false
    for (var i = 0; i < this.accordion.length; i++) {
    if (this.accordion[i].num_splt === x && this.accordion[i].num_port === y )
    {this.accordion.splice(i,1); this.bool=true}
    }
      if (this.bool===false) this.accordion.push({ num_splt: x, num_port: y, port: 'Raccorde' });

  }

  annuler(){
    if (localStorage.getItem('ID_olt') != ''){
      localStorage.setItem('ID_olt','')
      this.router.navigateByUrl('pages/zones/gerer-olt')
    }
    if (localStorage.getItem('ID_sro') != ''){
      localStorage.setItem('ID_sro','')
      this.router.navigateByUrl('pages/zones/gerer-sro')

    }
    //a verifier!!
    if (localStorage.getItem('ID_immeuble') != ''){
      localStorage.setItem('ID_immeuble','')
      this.router.navigateByUrl('pages/zones/gerer-immeuble')
    }
  }


  onFormSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;

    // //stockage de l'etat final de l'olt dans accordion1
    // this.accordion1 = []
    // for (var i = 1; i <= this.nbs; i++) {
    //   for (var j = 1; j <= this.nbp; j++) {
    //     var k = 0; var baal=false;
    //       while(k < this.accordion.length && baal==false){
    //           if (this.accordion[k].num_splt==i && this.accordion[k].num_port==j )
    //           {this.accordion1.push({ num_splt: i, num_port: j, port: 'Raccorde' }); baal=true}
    //           else  {k++;}

    //       }
    //       if(baal== false) this.accordion1.push({ num_splt: i, num_port: j, port: 'Libre' });
    //   }
    // }

    if (localStorage.getItem('ID_olt') != ''){
    this.cassette.ID_olt=Number(localStorage.getItem('ID_olt'))
    this.cassette.ID_immeuble=null
    this.cassette.ID_sro=null
    }
    if (localStorage.getItem('ID_sro') != ''){
    this.cassette.ID_sro=Number(localStorage.getItem('ID_sro'))
    this.cassette.ID_immeuble=null
    this.cassette.ID_olt=null
    }

    if (localStorage.getItem('ID_immeuble') != ''){
    this.cassette.ID_immeuble=Number(localStorage.getItem('ID_immeuble'))
    this.cassette.ID_sro=null
    this.cassette.ID_olt=null
    }

    this.cassette.Num_cassette = this.registerForm.controls["NmCasete"].value;
    this.cassette.Nom_cassette = this.registerForm.controls["Nom"].value;

    this.splitter.Type_splitter=this.registerForm.controls["Typespt"].value;

    var f= Number(this.splitter.Type_splitter)
    var d=0
    this.ftthService.AjoutCassette(this.cassette).subscribe(data => {
      this.splitter.ID_cassette=data.ID_cassette
      for(var i=0;i<this.nbs;i++){
      this.splitter.Position=i+1;
      this.ftthService.AjoutSplitter(this.splitter).subscribe(data =>
       { this.port.ID_splitter=data.ID_splitter
          this.port.Position_tiroir= "Non Raccodé"
            this.port.Etat = "Libre"
            this.port.Position = 0
            this.port.Type = "IN"
            this.ftthService.AjoutPort(this.port).subscribe(data => {},error => {})

          this.port.Type="OUT"
          for(var m=0;m<this.splitter.Type_splitter ;m++ )
          { this.port.Position = m+1
           this.ftthService.AjoutPort(this.port).subscribe(data => {},error => {})
          }

        // for(var m=d;m<f ;m++ )
        // {
        //   this.port.Etat = this.accordion1[m].port
        // this.ftthService.AjoutPort(this.port).subscribe(data => {},error => {});
        // }
        // f+=Number(this.splitter.Type_splitter);
        // d+=Number(this.splitter.Type_splitter);
        },error => {});
    }   alert("succes ajout");
  },error => {});

  this.annuler();
  }

}
