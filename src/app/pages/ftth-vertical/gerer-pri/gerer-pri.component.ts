import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Cassette } from '../../../_models/cassette';
import { Splitter } from '../../../_models/splitter';
import { Port } from '../../../_models/port';
import { NbGlobalPhysicalPosition, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FtthService } from '../../../_service/ftth.service';
import { Pri } from '../../../_models/pri';
import { Sro } from '../../../_models/sro';
import { Olt } from '../../../_models/olt';

@Component({
  selector: 'ngx-gerer-pri',
  templateUrl: './gerer-pri.component.html',
  styleUrls: ['./gerer-pri.component.scss']
})
export class GererPriComponent implements OnInit {

  status: NbComponentStatus ;
  FormRacOut: FormGroup;
  FormRacIn: FormGroup;
  loading = false;
  submitted = false;
  rest = [1,2,3,4,5,6,7,8,9,10,11]

  ngOnInit() {
    this.pris=[]
    this.ftthService.getPriByZone(localStorage.getItem('ID_sro')).subscribe(data => {this.pris = data;}, error => {
    this.status="warning"
    this.toastrService.show(``,`Aucun PRI`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
  }

  constructor(private toastrService: NbToastrService,private formBuilder: FormBuilder, private router: Router, private ftthService: FtthService) {
    this.FormRacOut = this.formBuilder.group({
      Num_TD: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      Pos_TD:['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
    });

    this.FormRacIn = this.formBuilder.group({
      Pos_TDin : ['', Validators.compose([Validators.required,Validators.maxLength(6), Validators.pattern('^[0-9]*$')])],
    });

  }

  pris: Array<Pri>;
  cassettes: Array<Cassette>;
  splitters: Array<Splitter>;


  editPri(e) {
    localStorage.setItem("ID_pri", e.ID_pri.toString());
    localStorage.setItem("Nom_pri", e.Nom_pri.toString());
    localStorage.setItem("Nom_residence", e.Nom_residence.toString());
    localStorage.setItem("N_c_d", e.Num_cable_distribution.toString());
    localStorage.setItem("Num_plan", e.Num_plan.toString());
    localStorage.setItem("Nb_prise", e.Nb_prise.toString());
    localStorage.setItem("Num_syndique", e.Num_syndique.toString());
    localStorage.setItem("Nom_syndique", e.Nom_syndique.toString());
    localStorage.setItem("ID_sro", e.ID_sro.toString());
    this.router.navigateByUrl("pages/immeubles/modifier-pri");
  }

  deletePri(e) {
    localStorage.setItem("ID_pri",e.ID_pri)

  }
  deleteC(e){
    localStorage.setItem("ID_cassette",e.ID_cassette)
  }

  deleteS(e){
    localStorage.setItem("ID_splitter",e.ID_splitter)
  }

  ConfirmeSupR(){
    this.ftthService.deletePri(Number(localStorage.getItem("ID_pri"))).subscribe(
      Response => {
        this.status="danger"
        this.toastrService.show(``,`PRI supprimée avec sucess!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
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
    localStorage.setItem("ID_pri",'')
    localStorage.setItem("ID_cassette",'')
    localStorage.setItem("ID_splitter",'')
  }

  AjoutC(e){
    //localStorage.setItem("ID_pri", e.ID_pri.toString());
    this.router.navigateByUrl("pages/zones/ajout-cassette");
  }
  AjoutS(e){
    localStorage.setItem("ID_cassette", e.ID_cassette.toString());
    this.router.navigateByUrl("pages/zones/ajout-splitter");
  }

  openC(e) {
    this.cassettes=[]
    this.ftthService.getByPri(e.ID_pri).subscribe(data => {this.cassettes = data;
    },error => {this.status="warning"
    this.toastrService.show(``,`Cette Pri ne contient pas de cassettes`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
    localStorage.setItem("ID_pri", e.ID_pri )
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

  pri: Pri
  num: number
  chekyracIN(e){

    this.ftthService.getBySplitterIn(e.ID_splitter).subscribe(data => {this.porta= data
    localStorage.setItem("ID_port", this.porta[0].ID_port.toString())
    this.ftthService.updatePort(this.porta[0].ID_port.toString(),this.porto ).subscribe((data)=>{this.porti[0] = data;this.itat=this.porti[0].Etat
    },(error)=>{alert('error modification!!');})
    },(error)=>{alert("error port in ")})

    this.ftthService.getPriById(localStorage.getItem("ID_pri")).subscribe((data)=>{
        this.pri=data
        this.num=this.pri.Num_cable_distribution
        localStorage.setItem("n_c_d",this.pri.Num_cable_distribution.toString())

    },(error)=>{alert('error pri');})
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

    this.porto.Position_tiroir= "TD N°: "+localStorage.getItem('n_c_d')+" Position: "+this.FormRacIn.controls["Pos_TDin"].value;
    this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{this.porti[0] = data;this.itat=this.porti[0].Etat;this.status="success"
    this.toastrService.show(``,`Port raccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
    this.closeModal.nativeElement.click()
    localStorage.setItem("ID_port",'')
    localStorage.setItem("n_c_d",'')

  }
  DeraccordeIN(){
    this.porto.Position_tiroir="Non Raccordé"
    this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{this.porti[0] = data;this.itat=this.porti[0].Etat;this.status="success"
    this.toastrService.show(``,`Port déraccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
    localStorage.setItem("ID_port",'')
    localStorage.setItem("n_c_d",'')

   }
   annulerRIN(){
    this.ftthService.updatePort(localStorage.getItem("ID_port") , this.porto).subscribe((data)=>{this.porti[0] = data;this.itat=this.porti[0].Etat},(error)=>{alert('error modification!!');})
    localStorage.setItem("ID_port",'')
    localStorage.setItem("n_c_d",'')

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
    this.porto.Position_tiroir= "TCM N°: "+this.FormRacOut.controls["Num_TD"].value+" Position: "+this.FormRacOut.controls["Pos_TD"].value
    this.pos= Number(localStorage.getItem('Port_position'))-1
    this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{ this.ports[this.pos] = data;this.status="success"
    this.toastrService.show(``,`Port raccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
    this.closeModal2.nativeElement.click()
    localStorage.setItem("Port_position",'')
    localStorage.setItem("ID_port",'')

  }

  DeraccordeOUT(){
    this.porto.Position_tiroir="Non Raccordé"
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
  sro : Sro
  posPs : Number
  posSs : Number
  posCs : Number
  nomOLT : string
  nomSRO : string
  posTT : string
  posTD : string

  posPo:number
  splt1:Splitter
  posSo:number
  cast1: Cassette
  posCo:number
  portIN1: Array<Port>
  portOUT1: Port



  showCrsp(e){ //nom équipements
    this.ftthService.getPriById(localStorage.getItem("ID_pri")).subscribe((data)=>{this.pri= data
      this.ftthService.getSroById(this.pri.ID_sro.toString()).subscribe((data)=>{this.sro= data
        this.nomSRO=this.sro.Nom_sro
        this.ftthService.getOltById(this.sro.ID_olt).subscribe((data)=>{this.olt= data
          this.nomOLT=this.olt.Nom_olt
          }, (error)=>{})
        }, (error)=>{})
     }, (error)=>{})



     this.ftthService.getBySplitterIn(e.ID_splitter).subscribe(data => {this.portIN = data;
       this.ftthService.getPortCorrespondantIn(this.portIN[0].Position_tiroir).subscribe(data => {this.portOUT = data;
         this.posTD=this.portOUT[0].Position_tiroir
         this.posPs=this.portOUT[0].Position

        // position spliter cassette SRO
         this.ftthService.getSplitterById(this.portOUT[0].ID_splitter).subscribe(data => {this.splt = data;
           this.posSs=this.splt[0].Position
           this.ftthService.getCassetteById(this.splt[0].ID_cassette).subscribe(data => {this.cast = data;
             this.posCs=this.cast[0].Num_cassette


           },error=>{alert('error')});
         },error=>{alert('error')});

              this.ftthService.getBySplitterIn(this.portOUT[0].ID_splitter).subscribe(data => {this.portIN1 = data;
               this.ftthService.getPortCorrespondantIn(this.portIN1[0].Position_tiroir).subscribe(data => {this.portOUT1 = data;

                 this.posTT=this.portOUT1[0].Position_tiroir
                 this.posPo=this.portOUT1[0].Position

                 // position spliter cassette OLT

                 this.ftthService.getSplitterById(this.portOUT[0].ID_splitter).subscribe(data => {this.splt1 = data;
                   this.posSo=this.splt1[0].Position
                   this.ftthService.getCassetteById(this.splt1[0].ID_cassette).subscribe(data => {this.cast1 = data;
                     this.posCo=this.cast1[0].Num_cassette

                   },error=>{alert('error')})
                 },error=>{alert('error')})



       },error=>{alert('error')});
     },error=>{alert('error')});


   },error=>{alert('error')});
 },error=>{alert('error')});

}
}

