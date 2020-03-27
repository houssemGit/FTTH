import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Cassette } from "../../../_models/cassette";
import { Splitter } from "../../../_models/splitter";
import { Port } from "../../../_models/port";
import { Sro } from '../../../_models/sro';

@Component({
  selector: 'ngx-gerer-sro',
  templateUrl: './gerer-sro.component.html',
  styleUrls: ['./gerer-sro.component.scss']
})
export class GererSroComponent implements OnInit {

  constructor(private router: Router, private ftthService: FtthService) {}

  sros: Array<Sro>;
  cassettes: Array<Cassette>;
  splitters: Array<Splitter>;
  ports: Array<Port>;

  editSro(e) {
    localStorage.setItem("ID_sro", e.ID_sro.toString());
    localStorage.setItem("Nom_zone", e.Nom_zone.toString());
    localStorage.setItem("Nom_sro", e.Nom_sro.toString());
    localStorage.setItem("Num_cable_transport", e.Num_cable_transport.toString());
    localStorage.setItem("ID_olt", e.ID_olt.toString());
    this.router.navigateByUrl("pages/zones/modifier-sro");
  }
  deleteSro(e) {
    console.log(e);
    this.ftthService.deleteSro(e.ID_sro).subscribe(
      Response => {
          alert("sro supprime avec sucess!!");
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
    localStorage.setItem("ID_sro", e.ID_sro.toString());
    this.router.navigateByUrl("pages/zones/ajout-cassette");
  }
  AjoutS(e){
    localStorage.setItem("ID_cassette", e.ID_cassette.toString());
    localStorage.setItem("ID_olt", e.ID_olt);
    localStorage.setItem("ID_sro", e.ID_sro);
    localStorage.setItem("ID_immeuble", e.ID_immeuble);


    this.router.navigateByUrl("pages/zones/ajout-splitter");
  }


  openC(e) {
    this.cassettes=[]

    this.ftthService.getBySro(e.ID_sro).subscribe(data => {this.cassettes = data;},error => alert('aucune cassettes!'));


  }
  openS(e) {
    this.splitters=[]

    this.ftthService.getByCassette(e.ID_cassette).subscribe(data => {this.splitters = data;},error => alert('aucuns splitters!'));

  }
  openP(e) {
    this.ports=[]
    this.ftthService.getBySplitter(e.ID_splitter).subscribe(data => {this.ports = data;
    },error => alert('error ports'));
  }

  porto : Port=new Port
  cheky(e){
    this.ftthService.updatePort(e.ID_port,this.porto ).subscribe((data)=>{},(error)=>{alert('error modification!!');})
  }

  ngOnInit() {
    this.sros=[]
    this.ftthService.AllSro().subscribe(data => {this.sros = data;});
  }

}






