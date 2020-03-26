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

   @ViewChild('item',{static: false}) accordion;
   @ViewChild('item1',{static: false}) accordion1;
   @ViewChild('item2',{static: false}) accordion2;
   @ViewChild('item3',{static: false}) accordion3;
   @ViewChild('item4',{static: false}) accordion4;
   @ViewChild('item5',{static: false}) accordion5;

  openC(e) {
    this.cassettes=[]
    if(this.accordion.collapsed==false){
    this.ftthService.getByOlt(e.ID_olt).subscribe(data => {this.cassettes = data;});
    }
  }
  openS(e) {
    this.splitters=[]
    if(this.accordion1.collapsed==false){
    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitters = data;});
    }
  }
  openP(e) {
    this.ports=[]
    if(this.accordion2.collapsed==false){
    this.ftthService.getBySplitter(e.ID_splitter).subscribe(data => {this.ports = data;});
    }
  }

  openCs(e) {
    this.cassettess=[]
    if(this.accordion3.collapsed==false){
    this.ftthService.getBySro(e.ID_sro).subscribe(data => {this.cassettess = data;});
    }

  }
  openSs(e) {
    this.splitterss=[]
    if(this.accordion4.collapsed==false){
    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitterss = data;});
    }
  }
  openPs(e) {
    this.portss=[]
    if(this.accordion5.collapsed==false){
    this.ftthService.getBySplitter(e.ID_splitter).subscribe(data => {this.portss = data;});
    }
  }


  ngOnInit() {

    this.ftthService.getOltByZone(localStorage.getItem('choixzone')).subscribe(data => {this.olt = data;});
    this.ftthService.getSroByZone(localStorage.getItem('choixzone')).subscribe(data => {this.sro = data;});


  }

}
