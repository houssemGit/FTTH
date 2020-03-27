import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FtthService } from "../../../_service/ftth.service";
import { Olt } from "../../../_models/olt";
import { Cassette } from "../../../_models/cassette";
import { Splitter } from "../../../_models/splitter";
import { Port } from "../../../_models/port";

@Component({
  selector: "ngx-gerer-olt",
  templateUrl: "./gerer-olt.component.html",
  styleUrls: ["./gerer-olt.component.scss"]
})
export class GererOltComponent implements OnInit {
  constructor(private router: Router, private ftthService: FtthService) {}

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
    this.ftthService.getBySplitter(e.ID_splitter).subscribe(data => {this.ports = data;
    },error => alert('error ports'));
  }

  porto : Port=new Port
  cheky(e){
    this.ftthService.updatePort(e.ID_port,this.porto ).subscribe((data)=>{},(error)=>{alert('error modification!!');})
  }

  ngOnInit() {
    this.olts=null
    this.ftthService.AllOlt().subscribe(data => {this.olts = data;});

  }
}
