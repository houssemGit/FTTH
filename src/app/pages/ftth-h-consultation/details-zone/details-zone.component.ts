import { Component, OnInit } from '@angular/core';
import { Splitter } from '../../../_models/splitter';
import { Cassette } from '../../../_models/cassette';
import { Port } from '../../../_models/port';
import { Sro } from '../../../_models/sro';
import { Olt } from '../../../_models/olt';
import { Router } from '@angular/router';
import { NbComponentStatus, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { FtthService } from '../../../_service/ftth.service';

@Component({
  selector: 'ngx-details-zone',
  templateUrl: './details-zone.component.html',
  styleUrls: ['./details-zone.component.scss']
})
export class DetailsZoneComponent implements OnInit {


  constructor(private router: Router, private ftthService: FtthService,private toastrService: NbToastrService) {}

  status: NbComponentStatus ;
  olt: Olt;
  sro: Sro;
  olts: Olt;
  sros: Sro;
  cassettes: Array<Cassette>;
  splitters: Array<Splitter>;
  cassettess: Array<Cassette>;
  splitterss: Array<Splitter>;
  portss: Array<Port>;
  ports: Array<Port>;


  openC(e) {
    this.cassettes=[]

    this.ftthService.getByOlt(e.ID_olt).subscribe(data => {this.cassettes = data;},error=>{this.status="warning"
    this.toastrService.show(``,`Cette SRO ne contient pas de cassettes`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});

  }
  openS(e) {
    this.splitters=[]

    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitters = data;},error=>{this.status="warning"
    this.toastrService.show(``,`Cette Cassette ne contient pas de splitters`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});

  }
  openP(e) {
    this.ports=[]

    this.ftthService.getBySplitterOut(e.ID_splitter).subscribe(data => {this.ports = data;},error=>{alert('error')});

  }

  openCs(e) {
    this.cassettess=[]

    this.ftthService.getBySro(e.ID_sro).subscribe(data => {this.cassettess = data;},error=>{this.status="warning"
    this.toastrService.show(``,`Cette SRO ne contient pas de cassettes`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});});


  }
  openSs(e) {
    this.splitterss=[]
    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitterss = data;},error=>{
      this.status="warning"
        this.toastrService.show(``,`Cette Cassette ne contient pas de splitters`,{ status: this.status, destroyByClick: true, hasIcon: false,duration: 2000,position: NbGlobalPhysicalPosition.TOP_RIGHT});
      }
    )}

  itat: string;
  porti: Array<Port>

  openPs(e) {
    this.portss=[]
    this.ftthService.getBySplitterOut(e.ID_splitter).subscribe(data => {this.portss = data;},error=>{alert('error')});
    this.ftthService.getBySplitterIn(e.ID_splitter).subscribe(data => { this.porti = data; this.itat=this.porti[0].Etat},error=>{alert('error')});
  }


  portIN : Array<Port>
  portOUT : Port
  splt : Splitter
  cast : Cassette
  posP : Number
  posS : Number
  posC : Number
  posTT : string
  nomOLT : string
  coulfibre : string
  coultube : string
  oloto: Olt



  showCrsp(e){

    this.ftthService.getOltByZone(localStorage.getItem('choixzone')).subscribe((data)=>{ this.oloto= data; this.nomOLT=this.oloto[0].Nom_olt}, (error)=>{})

    this.ftthService.getBySplitterIn(e.ID_splitter).subscribe(data => {this.portIN = data;
      this.ftthService.getPortCorrespondantIn(this.portIN[0].Position_tiroir).subscribe(data => {this.portOUT = data;
        this.posTT=this.portOUT[0].Position_tiroir
        this.coulfibre=this.portOUT[0].Couleur_fibre
        this.coultube=this.portOUT[0].Couleur_tube
        this.posP=this.portOUT[0].Position

        this.ftthService.getSplitterById(this.portOUT[0].ID_splitter).subscribe(data => {this.splt = data;
          this.posS=this.splt[0].Position
          this.ftthService.getCassetteById(this.splt[0].ID_cassette).subscribe(data => {this.cast = data;
            this.posC=this.cast[0].Num_cassette

          },error=>{alert('error')});
        },error=>{alert('error')});
      },error=>{alert('error')});
    },error=>{alert('error')});

  }

  ngOnInit() {

    this.ftthService.getOltByZone(localStorage.getItem('choixzone')).subscribe(data => {this.olt = data;});
    this.ftthService.getSroByZone(localStorage.getItem('choixzone')).subscribe(data => {this.sro = data;});


  }
}
