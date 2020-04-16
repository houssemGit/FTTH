import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Olt } from "../../../_models/olt";
import { Cassette } from "../../../_models/cassette";
import { Splitter } from "../../../_models/splitter";
import { Port } from "../../../_models/port";
import { Sro } from '../../../_models/sro';


@Component({
  selector: 'ngx-details-zone',
  templateUrl: './details-zone.component.html',
  styleUrls: ['./details-zone.component.scss']
})
export class DetailsZoneComponent implements OnInit {

  constructor(private router: Router, private ftthService: FtthService) {}

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

    this.ftthService.getByOlt(e.ID_olt).subscribe(data => {this.cassettes = data;},error=>{alert('Cette olt ne contient pas de cassettes')});

  }
  openS(e) {
    this.splitters=[]

    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitters = data;},error=>{alert('Cette olt ne contient pas de splitters')});

  }
  openP(e) {
    this.ports=[]

    this.ftthService.getBySplitterOut(e.ID_splitter).subscribe(data => {this.ports = data;},error=>{alert('error')});

  }

  openCs(e) {
    this.cassettess=[]

    this.ftthService.getBySro(e.ID_sro).subscribe(data => {this.cassettess = data;},error=>{alert('Cette sro ne contient pas de cassettes')});


  }
  openSs(e) {
    this.splitterss=[]
    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitterss = data;},error=>{alert('Cette sro ne contient pas de splitters')});
  }

  itat: string;
  openPs(e) {
    this.portss=[]
    this.ftthService.getBySplitterOut(e.ID_splitter).subscribe(data => {this.portss = data;},error=>{alert('error')});
    //this.ftthService.getBySplitterIn(e.ID_splitter).subscribe(data => {this.itat = data.Etat;},error=>{alert('error')});
    this.itat='Raccorde';
  }


  portIN : Array<Port>
  portOUT : Port
  splt : Splitter
  cast : Cassette
  posP : Number
  posS : Number
  posC : Number
  posTT : string

  showCrsp(e){

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

  ngOnInit() {

    this.ftthService.getOltByZone(localStorage.getItem('choixzone')).subscribe(data => {this.olt = data;});
    this.ftthService.getSroByZone(localStorage.getItem('choixzone')).subscribe(data => {this.sro = data;});


  }
}
