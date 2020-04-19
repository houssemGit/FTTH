import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Cassette } from "../../../_models/cassette";
import { Splitter } from "../../../_models/splitter";
import { Port } from "../../../_models/port";
import { Sro } from '../../../_models/sro';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { Olt } from '../../../_models/olt';

@Component({
  selector: 'ngx-gerer-sro',
  templateUrl: './gerer-sro.component.html',
  styleUrls: ['./gerer-sro.component.scss']
})
export class GererSroComponent implements OnInit {

  status: NbComponentStatus ;

  FormRacOut: FormGroup;
  FormRacIn: FormGroup;
  loading = false;
  submitted = false;
  rest = [1,2,3,4,5,6,7,8,9,10,11]

  ngOnInit() {
    localStorage.clear();
    this.sros=[]
    this.ftthService.AllSro().subscribe(data => {this.sros = data;}, error => {this.status="warning"
    this.toastrService.show(``,`Aucun SRO`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
  }

  constructor(private toastrService: NbToastrService,private formBuilder: FormBuilder, private router: Router, private ftthService: FtthService) {
    this.FormRacOut = this.formBuilder.group({
      Num_TT: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      Pos_TT:['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
    });

    this.FormRacIn = this.formBuilder.group({
      Pos_TTin : ['', Validators.compose([Validators.required,Validators.maxLength(6), Validators.pattern('^[0-9]*$')])],
    });

  }



  sros: Array<Sro>;
  cassettes: Array<Cassette>;
  splitters: Array<Splitter>;


  editSro(e) {
    localStorage.setItem("ID_sro", e.ID_sro.toString());
    localStorage.setItem("Nom_zone", e.Nom_zone.toString());
    localStorage.setItem("Nom_sro", e.Nom_sro.toString());
    localStorage.setItem("Num_cable_transport", e.Num_cable_transport.toString());
    localStorage.setItem("Capacite_cable_transport", e.Capacite_cable_transport.toString());
    localStorage.setItem("ID_olt", e.ID_olt.toString());
    this.router.navigateByUrl("pages/zones/modifier-sro");
  }

  deleteSro(e) {
    localStorage.setItem("ID_sro",e.ID_sro)

  }
  deleteC(e){
    localStorage.setItem("ID_cassette",e.ID_cassette)


  }
  deleteS(e){
    localStorage.setItem("ID_splitter",e.ID_splitter)

  }
  ConfirmeSupR(){
    this.ftthService.deleteSro(Number(localStorage.getItem("ID_sro"))).subscribe(
      Response => {
        this.status="danger"
        this.toastrService.show(``,`SRO supprimée avec sucess!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
        localStorage.setItem("ID_sro",'')
        this.ngOnInit();
      },
      error => alert("Erreur lors de la communication avec serveur")
    );
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
    localStorage.setItem("ID_sro",'')
    localStorage.setItem("ID_cassette",'')
    localStorage.setItem("ID_splitter",'')
  }
  AjoutC(e){
    localStorage.setItem("ID_sro", e.ID_sro.toString());
    this.router.navigateByUrl("pages/zones/ajout-cassette");
  }
  AjoutS(e){
    localStorage.setItem("ID_cassette", e.ID_cassette.toString());
    this.router.navigateByUrl("pages/zones/ajout-splitter");
  }

  openC(e) {
    this.cassettes=[]
    this.ftthService.getBySro(e.ID_sro).subscribe(data => {this.cassettes = data;
    },error => {this.status="warning"
    this.toastrService.show(``,`Cette SRO ne contient pas de cassettes`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
    localStorage.setItem("ID_sro", e.ID_sro )
  }

  openS(e) {
    this.splitters=[]

    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitters = data;},error => {this.status="warning"
    this.toastrService.show(``,`Cette Cassette ne contient pas de splitters`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});

  }
  porti: Array<Port>
  ports: Array<Port>;
  itat : string

  openP(e) {
    this.ports=[]
    this.porti=[]
    this.ftthService.getBySplitterOut(e.ID_splitter).subscribe(data => {this.ports = data; },error => alert('error ports'));
    this.ftthService.getBySplitterIn(e.ID_splitter).subscribe(data => { this.porti = data; this.itat=this.porti[0].Etat},error=>{alert('error')});

  }


  get fval1() {
    return this.FormRacOut.controls;
  }
  get fval2() {
    return this.FormRacIn.controls;
  }

  sro: Sro
  num: number
  chekyracIN(e){

    this.ftthService.getBySplitterIn(e.ID_splitter).subscribe(data => {this.porta= data
    localStorage.setItem("ID_port", this.porta[0].ID_port.toString())
    this.ftthService.updatePort(this.porta[0].ID_port.toString(),this.porto ).subscribe((data)=>{this.porti[0] = data;this.itat=this.porti[0].Etat
    },(error)=>{alert('error modification!!');})
    },(error)=>{alert("error port in ")})

    this.ftthService.getSroById(localStorage.getItem("ID_SRO")).subscribe((data)=>{
        this.sro=data
        this.num=this.sro.Num_cable_transport
        localStorage.setItem("n_c_t",this.sro.Num_cable_transport.toString())

    },(error)=>{alert('error sro');})
  }

  porta: Array<Port>
  chekyderacIN(e){

    this.ftthService.getBySplitterIn(e.ID_splitter).subscribe(data => {this.porta= data
      localStorage.setItem("ID_port", this.porta[0].ID_port.toString())
      this.ftthService.updatePort(this.porta[0].ID_port.toString(),this.porto ).subscribe((data)=>{this.porti[0] = data;this.itat=this.porti[0].Etat},(error)=>{alert('error modification!!');})
      },(error)=>{alert("error port in ")})
  }

  @ViewChild('closeModal',{static: false}) private closeModal: ElementRef;


  SubRaccordeIN(){
    this.submitted = true;
    if (this.FormRacIn.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;

    this.porto.Position_tiroir= "TT N°: "+localStorage.getItem('n_c_t')+" Position: "+this.FormRacIn.controls["Pos_TTin"].value;
    this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{this.porti[0] = data;this.itat=this.porti[0].Etat;this.status="success"
    this.toastrService.show(``,`Port raccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
    this.closeModal.nativeElement.click()
    localStorage.setItem("ID_port",'')
    localStorage.setItem("n_c_t",'')

  }
  DeraccordeIN(){
    this.porto.Position_tiroir="Non Raccodé"
    this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{this.porti[0] = data;this.itat=this.porti[0].Etat;this.status="success"
    this.toastrService.show(``,`Port déraccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
    localStorage.setItem("ID_port",'')
    localStorage.setItem("n_c_t",'')

   }
   annulerRIN(){
    this.ftthService.updatePort(localStorage.getItem("ID_port") , this.porto).subscribe((data)=>{this.porti[0] = data;this.itat=this.porti[0].Etat},(error)=>{alert('error modification!!');})
    localStorage.setItem("ID_port",'')
    localStorage.setItem("n_c_t",'')

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

    //this.porto=null
    this.porto.Position_tiroir= "TD N°: "+this.FormRacOut.controls["Num_TT"].value+" Position: "+this.FormRacOut.controls["Pos_TT"].value
    this.pos= Number(localStorage.getItem('Port_position'))-1
    this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{ this.ports[this.pos] = data;this.status="success"
    this.toastrService.show(``,`Port raccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
    this.closeModal2.nativeElement.click()
    localStorage.setItem("Port_position",'')
    localStorage.setItem("ID_port",'')

  }

  DeraccordeOUT(){
    this.porto.Position_tiroir="Non Raccodé"
    this.pos= Number(localStorage.getItem('Port_position'))-1
    this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{ this.ports[this.pos] = data;this.status="success"
    this.toastrService.show(``,`Port déraccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
    localStorage.setItem("Port_position",'')
    localStorage.setItem("ID_port",'')

   }
   annulerROUT(){

    this.pos= Number(localStorage.getItem('Port_position'))-1
    console.log(this.pos);
    this.ftthService.updatePort(localStorage.getItem("ID_port") , this.porto).subscribe((data)=>{ this.ports[this.pos] = data;},(error)=>{alert('error modification!!');})
    localStorage.setItem("Port_position",'')
    localStorage.setItem("ID_port",'')
  }




  portIN : Array<Port>
  portOUT : Port
  splt : Splitter
  cast : Cassette
  olt : Olt
  posP : Number
  posS : Number
  posC : Number
  nomOLT : string
  posTT : string

  showCrsp(e){

    this.ftthService.getSroById(localStorage.getItem("ID_sro")).subscribe((data)=>{this.sro= data
     this.ftthService.getOltById(this.sro.ID_olt).subscribe((data)=>{this.olt= data
      this.nomOLT=this.olt.Nom_olt
      }, (error)=>{})
    }, (error)=>{})

    this.ftthService.getBySplitterIn(e.ID_splitter).subscribe(data => {this.portIN = data;
      this.ftthService.getPortCorrespondantIn(this.portIN[0].Position_tiroir).subscribe(data => {this.portOUT = data;
        this.posTT=this.portOUT[0].Position_tiroir
        this.posP=this.portOUT[0].Position
        console.log(this.portOUT[0].ID_splitter);

        this.ftthService.getSplitterById(this.portOUT[0].ID_splitter).subscribe(data => {this.splt = data;
          this.posS=this.splt[0].Position
          this.ftthService.getCassetteById(this.splt[0].ID_cassette).subscribe(data => {this.cast = data;
            this.posC=this.cast[0].Num_cassette

          },error=>{alert('error')});
        },error=>{alert('error')});
      },error=>{alert('error')});
    },error=>{alert('error')});

  }


}






