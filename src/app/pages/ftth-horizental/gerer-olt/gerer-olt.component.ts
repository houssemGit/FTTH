import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Olt } from "../../../_models/olt";
import { Cassette } from "../../../_models/cassette";
import { Splitter } from "../../../_models/splitter";
import { Port } from "../../../_models/port";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbToastrService, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: "ngx-gerer-olt",
  templateUrl: "./gerer-olt.component.html",
  styleUrls: ["./gerer-olt.component.scss"]
})
export class GererOltComponent implements OnInit {
  FormRacOut: FormGroup;
  loading = false;
  submitted = false;
  constructor(private toastrService: NbToastrService,private formBuilder: FormBuilder,private router: Router, private ftthService: FtthService) {
    this.FormRacOut = this.formBuilder.group({
      Num_TT: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      Pos_TT:['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
    });
  }
  status: NbComponentStatus ;

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
    localStorage.setItem("ID_olt",e.ID_olt)
  }
  ConfirmeSupO(){
    this.ftthService.deleteOlt(Number(localStorage.getItem("ID_olt"))).subscribe(Response => {this.status="danger" ;this.toastrService.show(``,`OLT supprimée avec sucess!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
    localStorage.setItem("ID_olt",'')
    this.ngOnInit();},
         error => alert("Erreur lors de la communication avec serveur")
       );
     }

  deleteC(e){
    localStorage.setItem("ID_cassette",e.ID_cassette)
  }
  ConfirmeSupC(){
    this.ftthService.deleteCassette(Number(localStorage.getItem("ID_cassette"))).subscribe(
      Response => {
        this.status="danger"
        this.toastrService.show(``,`Cassette supprimée avec sucess!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
        localStorage.setItem("ID_cassette",'')
        this.ngOnInit();
      },
      error => alert("Erreur lors de la communication avec serveur")
    );
  }
  deleteS(e){
    localStorage.setItem("ID_splitter",e.ID_splitter)
  }

  ConfirmeSupS(){
    this.ftthService.deleteSplitter(Number(localStorage.getItem("ID_splitter"))).subscribe(
      Response => {
        this.status="danger"
        this.toastrService.show(``,`Splitter supprimée avec sucess!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
        localStorage.setItem("ID_splitter",'')
        this.ngOnInit();
      },
      error => alert("Erreur lors de la communication avec serveur")
    );
  }
  annulerSup(){
    localStorage.setItem("ID_olt",'')
    localStorage.setItem("ID_cassette",'')
    localStorage.setItem("ID_splitter",'')
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
    localStorage.setItem("ID_olt", e.ID_olt.toString());
    this.cassettes=[]
    this.ftthService.getByOlt(e.ID_olt).subscribe(data => {this.cassettes = data;
    },error => { this.status="warning"
    this.toastrService.show(``,`Cette OLT ne contient pas de cassettes`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});


  }
  openS(e) {
    this.splitters=[]

    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitters = data;},error => {this.status="warning"
    this.toastrService.show(``,`Cette Cassette ne contient pas de splitters`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});

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
    this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{ this.ports[this.pos] = data;;this.status="success"
    this.toastrService.show(``,`Port raccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
    this.closeModal2.nativeElement.click()
    localStorage.setItem("Port_position",'')
    localStorage.setItem("ID_port",'')

  }

  DeraccordeOUT(){
    this.porto.Position_tiroir="Non Raccordé"
    this.pos= Number(localStorage.getItem('Port_position'))-1
    this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{ this.ports[this.pos] = data;;this.status="success"
    this.toastrService.show(``,`Port déraccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
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
    localStorage.clear()
    this.olts=null
    this.ftthService.AllOlt().subscribe(data => {this.olts = data;},error => {this.status="warning"
    this.toastrService.show(``,`Aucun OLT`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
  }

}
