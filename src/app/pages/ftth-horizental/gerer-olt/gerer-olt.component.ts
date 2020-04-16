import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Olt } from "../../../_models/olt";
import { Cassette } from "../../../_models/cassette";
import { Splitter } from "../../../_models/splitter";
import { Port } from "../../../_models/port";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: "ngx-gerer-olt",
  templateUrl: "./gerer-olt.component.html",
  styleUrls: ["./gerer-olt.component.scss"]
})
export class GererOltComponent implements OnInit {
  FormRacOut: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private router: Router, private ftthService: FtthService) {
    this.FormRacOut = this.formBuilder.group({
      Num_TT: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      Pos_TT:['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
    });
  }

  olts: Array<Olt>;
  cassettes: Array<Cassette>;
  splitters: Array<Splitter>;
  ports: Array<Port>;

  editOlt(e) {
    localStorage.setItem("ID_olt", e.ID_olt.toString());
    localStorage.setItem("Localisation", e.Localisation.toString());
    localStorage.setItem("Nom_olt", e.Nom_olt.toString());
    this.router.navigateByUrl("pages/zones/modifier-olt");
  }
  deleteOlt(e) {
    console.log(e);
    this.ftthService.deleteOlt(e.ID_olt).subscribe(
      Response => {
          alert("olt supprime avec sucess!!");
          //this.toaster.success("Suppresion avec succés");
          this.ngOnInit();
      },
      error => alert("Erreur lors de la communication avec serveur") //this.toaster.error("Erreur lors de la communication avec serveur")
    );
  }
  deleteC(e){
    this.ftthService.deleteCassette(e.ID_cassette).subscribe(
      Response => {
          alert("cassette supprime avec sucess!!");
          //this.toaster.success("Suppresion avec succés");
          this.ngOnInit();
      },
      error => alert("Erreur lors de la communication avec serveur") //this.toaster.error("Erreur lors de la communication avec serveur")
    );

  }
  deleteS(e){
    this.ftthService.deleteSplitter(e.ID_splitter).subscribe(
      Response => {
          alert("splitter supprime avec sucess!!");
          //this.toaster.success("Suppresion avec succés");
          this.ngOnInit();
      },
      error => alert("Erreur lors de la communication avec serveur") //this.toaster.error("Erreur lors de la communication avec serveur")
    );
  }
  AjoutC(e){
    localStorage.setItem("ID_olt", e.ID_olt.toString());
    this.router.navigateByUrl("pages/zones/ajout-cassette");
  }
  AjoutS(e){
    localStorage.setItem("ID_cassette", e.ID_cassette.toString());
    this.router.navigateByUrl("pages/zones/ajout-splitter");
  }

  openC(e) {
    this.cassettes=[]
    this.ftthService.getByOlt(e.ID_olt).subscribe(data => {this.cassettes = data;
    },error => alert('aucune cassettes!'));


  }
  openS(e) {
    this.splitters=[]

    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitters = data;},error => alert('aucun splitter!'));

  }

  openP(e) {
    this.ports=[]
    this.ftthService.getBySplitterOut(e.ID_splitter).subscribe(data => {this.ports = data;
    },error => alert('error ports'));
  }


  get fval1() {
    return this.FormRacOut.controls;
  }
  porto : Port=new Port   //ta3 el update
  chekyracout(e){
    localStorage.setItem("ID_port", e.ID_port)
    localStorage.setItem("Port_position", e.Position)
    this.pos=e.Position-1
    this.ftthService.updatePort(e.ID_port,this.porto ).subscribe((data)=>{this.ports[this.pos] = data;},(error)=>{alert('error modification!!');})
  }

  chekyderacout(e){
    localStorage.setItem("ID_port", e.ID_port)
    localStorage.setItem("Port_position", e.Position)
    this.pos=e.Position-1
    this.ftthService.updatePort(e.ID_port,this.porto ).subscribe((data)=>{this.ports[this.pos] = data;},(error)=>{alert('error modification!!');})
  }

  @ViewChild('closeModal2',{static: false}) private closeModal2: ElementRef;
  pos : number

  SubRaccordeOUT(){
    this.submitted = true;
    if (this.FormRacOut.invalid) {return console.log("champs invalid");}
    this.loading = true;

    this.porto.Position_tiroir= "TT N°: "+this.FormRacOut.controls["Num_TT"].value+" Position: "+this.FormRacOut.controls["Pos_TT"].value
    this.pos= Number(localStorage.getItem('Port_position'))-1
    this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{ this.ports[this.pos] = data;},(error)=>{alert('error modification!!');})
    this.closeModal2.nativeElement.click()
    localStorage.setItem("Port_position",'')
    localStorage.setItem("ID_port",'')

  }

  DeraccordeOUT(){
    this.porto.Position_tiroir="Non Raccodé"
    this.pos= Number(localStorage.getItem('Port_position'))-1
    this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{ this.ports[this.pos] = data;},(error)=>{alert('error modification!!');})
    localStorage.setItem("Port_position",'')
    localStorage.setItem("ID_port",'')

   }
   annulerROUT(){

    this.pos= Number(localStorage.getItem('Port_position'))-1
    this.ftthService.updatePort(localStorage.getItem("ID_port") , this.porto).subscribe((data)=>{ this.ports[this.pos] = data;},(error)=>{alert('error modification!!');})
    localStorage.setItem("Port_position",'')
    localStorage.setItem("ID_port",'')
  }

  ngOnInit() {
    this.olts=null
    this.ftthService.AllOlt().subscribe(data => {this.olts = data;});

  }
}
