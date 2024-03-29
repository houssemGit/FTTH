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
    localStorage.removeItem('ID_port');localStorage.removeItem('ID_olt');localStorage.removeItem('ID_pri');localStorage.removeItem('ID_sro')
    localStorage.removeItem('ID_cassette')
    this.sros=[]
    this.ftthService.AllSro().subscribe(data => {this.sros = data;}, error => {this.status="warning"
    this.toastrService.show(``,`Aucun SRO`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});
    //clear storage
    localStorage.removeItem("Nom_zone");localStorage.removeItem("Nom_sro");localStorage.removeItem("N_N_C_T")

  }

  constructor(private toastrService: NbToastrService,private formBuilder: FormBuilder, private router: Router, private ftthService: FtthService) {
    this.FormRacOut = this.formBuilder.group({
      Num_TT: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      Pos_TT:['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      Coul_fib:["", Validators.required],
      Coul_tube:["", Validators.required],
    });

    this.FormRacIn = this.formBuilder.group({
      Pos_TTin :['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      Num_TTin :['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],

    });

  }



  sros: Array<Sro>;
  cassettes: Array<Cassette>;
  splitters: Array<Splitter>;


  editSro(e) {
    localStorage.setItem("ID_sro", e.ID_sro.toString());
    localStorage.setItem("Nom_zone", e.Nom_zone.toString());
    localStorage.setItem("Nom_sro", e.Nom_sro.toString());
    localStorage.setItem("N_N_C_T", e.Nom_Cpacite_cable_transport.toString());
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
    this.ftthService.getBySplitterOut(e.ID_splitter).subscribe(data => {this.ports = data; console.log(this.ports);

     },error => alert('error ports'));
    this.ftthService.getBySplitterIn(e.ID_splitter).subscribe(data => { this.porti = data; this.itat=this.porti[0].Etat},error=>{alert('error')});

  }




  get ctu() {
    return this.FormRacOut.get("Coul_tube");
  }
  Coul_tube(e) {
    this.ctu.setValue(e.target.value, { onlySelf: true });
  }
  get cfb() {
    return this.FormRacOut.get("Coul_fib");
  }
  Coul_fib(e) {
    this.cfb.setValue(e.target.value, { onlySelf: true });
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
    this.bool=true
    this.submitted = true;
    if (this.FormRacIn.invalid) {
      return console.log("champs invalid");
    }
    this.loading = true;
    this.porto.Position_tiroir= "TT N°: "+this.FormRacIn.controls["Num_TTin"].value+" Position: "+this.FormRacIn.controls["Pos_TTin"].value;
    this.ftthService.UniquePosSro(localStorage.getItem("ID_sro"),this.porto.Position_tiroir).subscribe(data=>{
      if(data==true) {
       this.bool=false
       this.status="danger";
       this.toastrService.show(``,`Position tiroire déjà raccordée!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 3000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
       this.closeModal.nativeElement.click()
       this.annulerRIN()
       return console.log("Non unique");}

       if(this.bool){
        this.porto.Couleur_fibre="none"
        this.porto.Couleur_tube="none"
        this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{this.porti[0] = data;this.itat=this.porti[0].Etat;this.status="success"
        this.toastrService.show(``,`Port raccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
        this.closeModal.nativeElement.click()
        localStorage.removeItem("ID_port")
       }
    })


  }
  DeraccordeIN(){
    this.porto.Couleur_fibre="none"
    this.porto.Couleur_tube="none"
    this.porto.Position_tiroir="Non Raccordé"
    this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{this.porti[0] = data;this.itat=this.porti[0].Etat;this.status="success"
    this.toastrService.show(``,`Port déraccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
    localStorage.removeItem("ID_port")

   }
   annulerRIN(){
    this.ftthService.updatePort(localStorage.getItem("ID_port") , this.porto).subscribe((data)=>{this.porti[0] = data;this.itat=this.porti[0].Etat},(error)=>{alert('error modification!!');})
    localStorage.removeItem("ID_port")

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
  bool: boolean

  SubRaccordeOUT(){
    this.bool=true
    this.submitted = true;
    if (this.FormRacOut.invalid) {return console.log("champs invalid");}
    this.loading = true;

    this.porto.Position_tiroir= "TD N°: "+this.FormRacOut.controls["Num_TT"].value+" Position: "+this.FormRacOut.controls["Pos_TT"].value
    this.ftthService.UniquePosSroOut(localStorage.getItem("ID_sro"),this.porto.Position_tiroir).subscribe(data=>{
     if(data==true) {
      this.bool=false
      this.status="danger";
      this.toastrService.show(``,`Position tiroire déjà raccordée!`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 3000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      this.closeModal2.nativeElement.click()
      this.annulerROUT()
      return console.log("Non unique");}

      if(this.bool){
        this.porto.Couleur_fibre=this.FormRacOut.controls["Coul_fib"].value
        this.porto.Couleur_tube=this.FormRacOut.controls["Coul_tube"].value
        this.pos= Number(localStorage.getItem('Port_position'))-1
        this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{ this.ports[this.pos] = data;this.status="success"
        this.toastrService.show(``,`Port raccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
        this.closeModal2.nativeElement.click()
        localStorage.removeItem("Port_position")
        localStorage.removeItem("ID_port")
       }
    })

  }

  DeraccordeOUT(){
    this.porto.Couleur_fibre="none"
    this.porto.Couleur_tube="none"
    this.porto.Position_tiroir="Non Raccordé"
    this.pos= Number(localStorage.getItem('Port_position'))-1
    this.ftthService.raccorder(localStorage.getItem("ID_port") ,this.porto).subscribe((data)=>{ this.ports[this.pos] = data;this.status="success"
    this.toastrService.show(``,`Port déraccordé avec succès`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});},(error)=>{alert('error modification!!');})
    localStorage.removeItem("Port_position")
    localStorage.removeItem("ID_port")

   }
   annulerROUT(){

    this.pos= Number(localStorage.getItem('Port_position'))-1
    this.ftthService.updatePort(localStorage.getItem("ID_port") , this.porto).subscribe((data)=>{ this.ports[this.pos] = data;},(error)=>{alert('error modification!!');})
    localStorage.removeItem("Port_position")
    localStorage.removeItem("ID_port")
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
  coulfibre : string
  coultube : string


voirCorrespondance(e){
  this.ftthService.voirCorrespondance(e).subscribe((data)=>{ }, (error)=>{})

}

  showCrsp(e){

    this.ftthService.getSroById(localStorage.getItem("ID_sro")).subscribe((data)=>{this.sro= data
     this.ftthService.getOltById(this.sro.ID_olt).subscribe((data)=>{this.olt= data
      this.nomOLT=this.olt.Nom_olt
      }, (error)=>{})
    }, (error)=>{})

    this.ftthService.getBySplitterIn(e.ID_splitter).subscribe(data => {this.portIN = data;
      this.ftthService.getPortCorrespondantIn(this.portIN[0].Position_tiroir).subscribe(data => {this.portOUT = data;
        this.posTT=this.portOUT[0].Position_tiroir
        this.coulfibre=this.portOUT[0].Couleur_fibre
        this.coultube=this.portOUT[0].Couleur_tube
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






