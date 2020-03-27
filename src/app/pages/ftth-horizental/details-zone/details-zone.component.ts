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

    this.ftthService.getByOlt(e.ID_olt).subscribe(data => {this.cassettes = data;});

  }
  openS(e) {
    this.splitters=[]

    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitters = data;});

  }
  openP(e) {
    this.ports=[]

    this.ftthService.getBySplitter(e.ID_splitter).subscribe(data => {this.ports = data;});

  }

  openCs(e) {
    this.cassettess=[]

    this.ftthService.getBySro(e.ID_sro).subscribe(data => {this.cassettess = data;});


  }
  openSs(e) {
    this.splitterss=[]

    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitterss = data;});

  }
  openPs(e) {
    this.portss=[]

    this.ftthService.getBySplitter(e.ID_splitter).subscribe(data => {this.portss = data;});

  }


  ngOnInit() {

    this.ftthService.getOltByZone(localStorage.getItem('choixzone')).subscribe(data => {this.olt = data;});
    this.ftthService.getSroByZone(localStorage.getItem('choixzone')).subscribe(data => {this.sro = data;});


  }

}
